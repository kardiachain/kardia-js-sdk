import { Client, HTTPTransport, RequestManager } from '@open-rpc/client-js';
import {
  decodeSignature,
  makeEven,
  sign,
  trimLeadingZero,
} from '../util/account';
import { fromNat } from '../util/bytes';
// import {keccak256} from 'js-sha3';
import { keccak256 } from '../util/hash';
import { decode, encode } from '../util/rlp';
import { isHexStrict, toHex } from '../util/string';
import { sleep } from '../util/time';
import { DEFAULT_GAS_PRICE, WAIT_TIMEOUT } from './config';

interface KardiaTransactionProps {
  client?: Client;
  provider?: string;
}

interface TxParams {
  nonce: any;
  to: string;
  gasPrice: any;
  gas: any;
  value: string;
  data: string;
}

class KardiaTransaction {
  private _rpcClient: Client;
  constructor({ client, provider }: KardiaTransactionProps) {
    if (client) {
      this._rpcClient = client;
    } else if (provider) {
      const transport = new HTTPTransport(provider);
      this._rpcClient = new Client(new RequestManager([transport]));
    } else {
      throw new Error('Either [client] or [provider] must be provided');
    }
  }

  public async getTransaction(txHash: string) {
    return await this._rpcClient.request({
      method: 'tx_getTransaction',
      params: [txHash],
    });
  }

  public async getPendingTransaction() {
    return await this._rpcClient.request({
      method: 'tx_pendingTransactions',
      params: [],
    });
  }

  public async getTransactionReceipt(txHash: string) {
    return await this._rpcClient.request({
      method: 'tx_getTransactionReceipt',
      params: [txHash],
    });
  }

  public async signTransaction(tx: TxParams, privateKey: string) {
    const _privateKey = `0x${privateKey.replace('0x', '')}`;
    if (!tx.gas) {
      throw new Error('"gas" is missing');
    }

    if (tx.nonce < 0 || tx.gas < 0 || tx.gasPrice < 0) {
      throw new Error('Gas, gasPrice, nonce is lower than 0');
    }

    const transaction = {
      nonce: tx.nonce,
      gasPrice: tx.gasPrice,
      gas: tx.gas,
      to: '0x' + tx.to.toLowerCase().replace('0x', ''),
      value: tx.value,
      data: '0x' + tx.data.toLowerCase().replace('0x', ''),
    };

    const rlpEncoded = encode([
      fromNat(transaction.nonce),
      fromNat(transaction.gasPrice),
      fromNat(transaction.gas),
      transaction.to.toLowerCase(),
      fromNat(transaction.value),
      transaction.data,
    ]);
    const hash = keccak256(rlpEncoded);
    const signature = sign(hash, _privateKey);
    const decodeSign = decodeSignature(signature);

    const rawTx = decode(rlpEncoded).concat(decodeSign);
    rawTx[6] = makeEven(trimLeadingZero(decodeSign[0]));
    rawTx[7] = makeEven(trimLeadingZero(decodeSign[1]));
    rawTx[8] = makeEven(trimLeadingZero(decodeSign[2]));

    const rawTransaction = encode(rawTx);

    const values = decode(rawTransaction);
    const result = {
      messageHash: hash,
      v: trimLeadingZero(values[6].toString()),
      r: trimLeadingZero(values[7].toString()),
      s: trimLeadingZero(values[8].toString()),
      rawTransaction: rawTransaction,
    };
    return result;
  }

  public generateTransaction({
    // Receiver alias
    receiver = '0x',
    to = '0x',
    // Amount alias
    amount = '0x0',
    value = '0x0',
    nonce = '0x0',
    gasPrice = '0xff',
    // Gas limit alias
    gas = '0xff',
    gasLimit = '0xff',
    data = '0x',
  }: any): TxParams {
    const _gasLimit = gas === '0xff' ? gasLimit : gas;
    const _value = amount === '0x0' ? value : amount;
    const _receiver = receiver === '0x' ? to : receiver;

    return {
      nonce: isHexStrict(nonce) ? nonce : toHex(nonce),
      to: _receiver,
      gasPrice: isHexStrict(gasPrice) ? gasPrice : toHex(gasPrice),
      gas: isHexStrict(_gasLimit) ? _gasLimit : toHex(_gasLimit),
      value: isHexStrict(_value) ? _value : toHex(_value),
      data: '0x' + data.toLowerCase().replace(/^0x/i, ''),
    };
  }

  /**
   *
   * @param data transaction params
   * @param privateKey Private key used to sign transaction
   * @param waitUntilMined wait for transaction to complete or not
   * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
   */
  public async sendTransaction(
    data: any,
    privateKey: string,
    waitUntilMined: boolean = false,
    waitTimeOut: number = 0
  ) {
    if (!data.gas) {
      const estimatedGas = await this.estimateGas(data, data.data);
      data.gas = estimatedGas * 10;
    }
    const generatedTx = await this.generateTransaction(data);
    const signedTx = await this.signTransaction(generatedTx, privateKey);

    const txHash = await this._rpcClient.request({
      method: 'tx_sendRawTransaction',
      params: [signedTx.rawTransaction],
    });
    if (!waitUntilMined) return txHash;

    const _waitTimeOut = waitTimeOut || WAIT_TIMEOUT;
    const breakTimeout = Date.now() + _waitTimeOut;
    while (Date.now() < breakTimeout) {
      try {
        const receipt = await this.getTransactionReceipt(txHash);
        if (receipt) {
          return receipt;
        } else {
          await sleep(1000);
        }
      } catch (err) {
        await sleep(1000);
      }
    }

    throw new Error(`Timeout: cannot get receipt after ${WAIT_TIMEOUT}ms`);
  }

  public async estimateGas(txPayload: any, data: string) {
    const txObject = {
      from: txPayload.from || '0x',
      to: txPayload.to || '0x',
      data,
      value: txPayload.value || 0,
      gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE,
    };
    return await this._rpcClient.request({
      method: 'kai_estimateGas',
      params: [txObject, 'latest'],
    });
  }
}

export default KardiaTransaction;
