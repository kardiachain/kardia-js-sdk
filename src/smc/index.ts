import { Client, RequestManager, HTTPTransport } from '@open-rpc/client-js';
import KardiaAccount from '../account';
import KardiaTransaction from '../transaction';
import {
  deployData,
  encodeArray,
  findFunctionFromAbi,
  methodData,
  parseEvent,
} from '../util/abi';
import { parseOutput } from '../util/abi/parser';
import { fromPrivate } from '../util/account';
import { getVersion } from '../util/helper';
import { isHexStrict, toHex } from '../util/string';
interface KardiaContractProps {
  client?: Client;
  provider?: string;
  bytecodes?: string;
  abi?: any[];
}

interface SMCDeployObject {
  gasLimit?: number;
  gasPrice?: number;
  params: any[];
}

const DEFAULT_GAS = 900000;
const DEFAULT_GAS_PRICE = 1000000000;

class KardiaContract {
  private _rpcClient: Client;
  public bytecodes: string;
  public abi: any[];
  private txModule: KardiaTransaction;
  constructor({ client, bytecodes, abi, provider }: KardiaContractProps) {
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

    this.txModule = new KardiaTransaction({ client: this._rpcClient });

    this.bytecodes = bytecodes || '';
    if (abi && !Array.isArray(abi)) throw new Error('Invalid [abi]');
    this.abi = abi || [];
  }

  updateAbi(abi: any[]) {
    this.abi = abi;
  }
  updateByteCode(bytecodes: string) {
    this.bytecodes = bytecodes;
  }
  info() {
    return {
      byteCode: this.bytecodes,
      abi: this.abi,
    };
  }
  deploy({ params }: SMCDeployObject) {
    const bytecode = this.bytecodes;
    const abi = this.abi;
    const constructorAbi = findFunctionFromAbi(abi, 'constructor');
    const decorBycode = '0x' + bytecode.replace('0x', '');
    const paramsDecorate = params.map(param => {
      if (Array.isArray(param)) {
        return encodeArray(param);
      } else if (isHexStrict(param)) {
        return param;
      } else {
        return toHex(param);
      }
    });
    const data = deployData(decorBycode, constructorAbi, paramsDecorate);
    return {
      txData: () => data,
      getDefaultTxPayload: () => {
        return {
          amount: 0,
          data,
          gasPrice: DEFAULT_GAS_PRICE,
          gas: DEFAULT_GAS,
        };
      },
      estimateGas: async (txPayload: Record<string, any> = {}) => {
        return await this.txModule.estimateGas(txPayload, data);
      },
      send: async (privateKey: string, txPayload: Record<string, any> = {}, waitUntilMined = false) => {
        const senderAccount = fromPrivate(privateKey);

        const account = new KardiaAccount({ client: this._rpcClient });
        const accountNonce = await account.getNonce(senderAccount.address);
        const transaction = new KardiaTransaction({ client: this._rpcClient });
        const result = await transaction.sendTransaction(
          {
            receiver: '0x',
            amount: txPayload.amount || 0,
            nonce: txPayload.nonce || accountNonce,
            gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE,
            gas: txPayload.gas || DEFAULT_GAS,
            data,
          },
          privateKey,
          waitUntilMined
        );
        return result;
      },
    };
  }

  invokeContract(name: string, params: any[]) {
    const functionFromAbi = findFunctionFromAbi(this.abi, 'function', name);
    const paramsDecorate = params.map(param => {
      if (Array.isArray(param)) {
        return encodeArray(param);
      } else if (isHexStrict(param)) {
        return param;
      } else {
        return toHex(param);
      }
    });
    const data = methodData(functionFromAbi, paramsDecorate);
    return {
      txData: () => data,
      getDefaultTxPayload: () => {
        return {
          amount: 0,
          gasPrice: DEFAULT_GAS_PRICE,
          // gas: DEFAULT_GAS,
          data,
        };
      },
      estimateGas: async (txPayload: Record<string, any>) => {
        return await this.txModule.estimateGas(txPayload, data);
      },
      getTxObject: async () => {
        const defaultPayload: any = {
          amount: 0,
          gasPrice: DEFAULT_GAS_PRICE,
          data,
        };
        const estimatedGas = await this.txModule.estimateGas(
          defaultPayload,
          data
        );
        defaultPayload.gas = estimatedGas;
        return defaultPayload;
      },
      send: async (
        privateKey: string,
        contractAddress: string,
        txPayload: Record<string, any> = {},
        waitUntilMined = false,
      ) => {
        const senderAccount = fromPrivate(privateKey);

        const account = new KardiaAccount({ client: this._rpcClient });
        const accountNonce = await account.getNonce(senderAccount.address);

        const transaction = new KardiaTransaction({ client: this._rpcClient });
        const txResult = await transaction.sendTransaction(
          {
            receiver: contractAddress,
            amount: txPayload.amount || 0,
            nonce: txPayload.nonce || accountNonce,
            gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE,
            gas: txPayload.gas || DEFAULT_GAS,
            data,
          },
          privateKey,
          waitUntilMined
        );

        if (!waitUntilMined) return txResult;

        const events = txResult.logs
          ? txResult.logs.map((item: any) => parseEvent(this.abi, item))
          : [];
        const result = {
          events,
          ...txResult,
        };
        return result;
      },
      call: async (
        contractAddress: string,
        txPayload: Record<string, any> = {},
        blockHeight: any = 'latest'
      ) => {
        const callObject = {
          from: txPayload.from || '0x',
          to: contractAddress,
          data: data,
          value: txPayload.amount || 0,
          gasPrice: txPayload.gasPrice || DEFAULT_GAS_PRICE,
          gas: txPayload.gas || DEFAULT_GAS,
        };
        // const result = await api.callSmartContract(callObject, blockHeight);
        const result = await this._rpcClient.request({
          method: 'kai_kardiaCall',
          params: [callObject, blockHeight],
        });

        return parseOutput(functionFromAbi.outputs, result);
      },
    };
  }

  async parseEvent(txHash: string) {
    // Get Tx receipt
    const transaction = new KardiaTransaction({ client: this._rpcClient });
    const tx = await transaction.getTransactionReceipt(txHash);
    // Parse event
    return tx.logs
      ? tx.logs.map((item: any) => parseEvent(this.abi, item))
      : [];
  }
}

export default KardiaContract;
