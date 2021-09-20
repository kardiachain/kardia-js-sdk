import { Client, HTTPTransport, RequestManager } from '@open-rpc/client-js';
import {
  decodeSignature,
  makeEven,
  sign,
  trimLeadingZero,
} from '../util/account';
import Web3 from 'web3';
import { fromNat } from '../util/bytes';
// import {keccak256} from 'js-sha3';
import { keccak256 } from '../util/hash';
import { decode, encode } from '../util/rlp';
import { isHexStrict, toHex } from '../util/string';
import { sleep } from '../util/time';
import { DEFAULT_GAS_PRICE, KARDIA_DEPLOYER, WAIT_TIMEOUT } from './config';
import { getVersion } from '../util/helper';
import KAIChain from '../kai';

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

const isExtensionEnabled = () => {
  if ((window as any).kardiachain) {
    (window as any).web3 = new Web3((window as any).kardiachain);
    if ((window as any).kardiachain.isKaiWallet) {
      (window as any).kardiachain.enable();
      return true;
    }
  }
  return false;
};

class KardiaTransaction {
  private _rpcClient: Client;
  constructor({ client, provider }: KardiaTransactionProps) {
    if (client) {
      this._rpcClient = client;
    } else if (provider) {
      const transport = new HTTPTransport(provider, {
        headers: {
          "User-Agent": `JS SDK / ${getVersion()}`
        }
      });
      this._rpcClient = new Client(new RequestManager([transport]));
    } else {
      throw new Error('Either [client] or [provider] must be provided');
    }
  }

  /**
   * Get transaction detail from transaction hash
   */
  public async getTransaction(txHash: string) {
    return await this._rpcClient.request({
      method: 'tx_getTransaction',
      params: [txHash],
    });
  }

  /**
   * Get node's pending transactions
   */
  public async getPendingTransaction() {
    return await this._rpcClient.request({
      method: 'tx_pendingTransactions',
      params: [],
    });
  }

  /**
   * Get transaction receipt from transaction hash
   * @param txHash Transaction hash
   */
  public async getTransactionReceipt(txHash: string) {
    return await this._rpcClient.request({
      method: 'tx_getTransactionReceipt',
      params: [txHash],
    });
  }

  /**
   * Send transaction to Chrome extension for signing and sending to blockchain
   * @param data transaction params
   * @param waitUntilMined wait for transaction to complete or not
   * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
   */
  public async sendTransactionToExtension(
    data: any,
    waitUntilMined: boolean = false,
    waitTimeOut: number = 0
  ) {
    if (!isExtensionEnabled()) {
      throw new Error('KardiaChain Wallet Extension not found');
    }

    const accounts = await (window as any).web3.eth.getAccounts();
    if (!data.gas) {
      const estimatedGas = await this.estimateGas(data, data.data);
      data.gas = estimatedGas * 10;
    }

    if (!data.gasPrice) {
      const _client = new KAIChain({client: this._rpcClient})
      data.gasPrice = await _client.getGasPrice();
    }

    const signPromise = () => {

      const txData: Record<string, any> = {
        from: accounts[0],
        gasPrice: data.gasPrice || DEFAULT_GAS_PRICE,
        gas: data.gas,
        to: data.to,
        value: data.value,
      }

      if (data.data) txData.data = data.data

      return new Promise((resolve: (txHash: string) => void, reject) => {
        (window as any).web3.eth.sendTransaction(
          txData,
          function(error: any, hash: string) {
            if (error) {
              reject(error);
            } else {
              resolve(hash);
            }
          }
        );
      });
    };

    const txHash = await signPromise();
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

  /**
   * Sign a transaction using provided private key
   * @param tx Transaction payload. For more information, refer to https://docs.kardiachain.io/js-sdk/reference/objects-reference#transaction-payload
   * @param privateKey Private key used for signing
   */
  public signTransaction(tx: TxParams, privateKey: string) {
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

  /**
   * Generate a transaction object used for signing
   * @param txParam Transaction's params
   * @param txParam.receiver Transaction receiver
   * @param txParam.to Alias of txParams.receiver
   * @param txParam.amount Transaction amount
   * @param txParam.value Alias of txParams.amount
   * @param txParam.nonce Transaction nonce
   * @param txParam.gasPrice Transaction gas price
   * @param txParam.gas Transaction gas limit
   * @param txParam.gasLimit Alias of amount txParams.gas
   * @param txParam.data Transaction data
   */
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
   * Send signed transaction to blockchain
   * @param rawTx Hex string represent signed transaction
   * @param waitUntilMined wait for transaction to complete or not
   * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
   */
  public async sendRawTransaction(rawTx: any, waitUntilMined: boolean = false, waitTimeOut: number = 0) {
    const txHash = await this._rpcClient.request({
      method: 'tx_sendRawTransaction',
      params: [rawTx],
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

  /**
   * Sign and send transaction to blockchain
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

    if (!data.gasPrice) {
      const _client = new KAIChain({client: this._rpcClient})
      data.gasPrice = await _client.getGasPrice();
    }

    const generatedTx = this.generateTransaction(data);
    const signedTx = this.signTransaction(generatedTx, privateKey);
    return this.sendRawTransaction(signedTx.rawTransaction, waitUntilMined, waitTimeOut || WAIT_TIMEOUT)
  }

  /**
   * Estimate gas cost
   * @param txPayload Transaction payload. For more information, refer to https://docs.kardiachain.io/js-sdk/reference/objects-reference#transaction-payload
   * @param data Hex string represent transaction data
   */
  public async estimateGas(txPayload: any, data: string) {
    const txObject = {
      from: txPayload.from || KARDIA_DEPLOYER,
      to: txPayload.to || '0x',
      data,
      value: txPayload.value || 0,
      gasPrice: 0
    };
    return await this._rpcClient.request({
      method: 'kai_estimateGas',
      params: [txObject, 'latest'],
    });
  }

  /**
   * Debug transaction
   * @param txHash Transaction hash to debug
   */
  public async debugTransaction(txHash: string) {
    return await this._rpcClient.request({
      method: 'debug_traceTransaction',
      params: [txHash],
    });
  }
}

export default KardiaTransaction;
