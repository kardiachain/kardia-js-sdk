import { Client } from '@open-rpc/client-js';
import { fromHydro, toHydro } from '../util/amount';
interface KAIProps {
  client: Client;
}

class KAIChain {
  private _rpcClient: Client;
  constructor({ client }: KAIProps) {
    this._rpcClient = client;
  }

  public async getBlockNumber() {
    return await this._rpcClient.request({
      method: 'kai_blockNumber',
      params: [],
    });
  }

  public async isValidator(address: string) {
    try {
      await this._rpcClient.request({
        method: 'kai_validator',
        params: [address, false],
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getValidators(withDelegators: boolean = false) {
    return await this._rpcClient.request({
      method: 'kai_validators',
      params: [withDelegators],
    });
  }

  public async getBlockByBlockNumber(blockNumber: number) {
    if (blockNumber < 0) {
      throw new Error('Invalid block number');
    }
    return await this._rpcClient.request({
      method: 'kai_getBlockByNumber',
      params: [blockNumber],
    });
  }

  public async getBlockByHash(blockHash: string) {
    return await this._rpcClient.request({
      method: 'kai_getBlockByHash',
      params: [blockHash],
    });
  }

  public async getBlockHeaderByBlockNumber(blockNumber: number) {
    if (blockNumber < 0) {
      throw new Error('Invalid block number');
    }
    return await this._rpcClient.request({
      method: 'kai_getBlockHeaderByNumber',
      params: [blockNumber],
    });
  }

  public async getBlockHeaderByHash(blockHash: string) {
    return await this._rpcClient.request({
      method: 'kai_getBlockHeaderByHash',
      params: [blockHash],
    });
  }

  public async newFilter(
    fromBlock?: 'latest' | number,
    toBlock?: 'latest' | number,
    address?: string,
    topics?: []
  ) {
    return await this._rpcClient.request({
      method: 'kai_newFilter',
      params: [
        {
          fromBlock: fromBlock,
          toBlock: toBlock,
          address: address,
          topics: topics,
        },
      ],
    });
  }

  public async newBlockFilter() {
    return await this._rpcClient.request({
      method: 'kai_newBlockFilter',
      params: [],
    });
  }

  public async uninstallFilter(filterId: string) {
    return await this._rpcClient.request({
      method: 'kai_uninstallFilter',
      params: [filterId],
    });
  }

  public async getFilterChanges(filterId: string) {
    return await this._rpcClient.request({
      method: 'kai_getFilterChanges',
      params: [filterId],
    });
  }

  public async getFilterLogs(filterId: string) {
    return await this._rpcClient.request({
      method: 'kai_getFilterLogs',
      params: [filterId],
    });
  }

  public async getLogs({
    fromBlock = 1,
    toBlock = 'latest',
    address,
    topics,
    blockhash,
  }: {
    fromBlock?: 'latest' | number;
    toBlock?: 'latest' | number;
    address?: string;
    topics?: (string | null)[];
    blockhash?: any;
  }) {
    const logsParams: Record<string, any> = {
      fromBlock: fromBlock,
      toBlock: toBlock,
      address: address,
      topics: topics,
    };
    if (blockhash) {
      logsParams.blockhash = blockhash;
    }
    return await this._rpcClient.request({
      method: 'kai_getLogs',
      params: [logsParams],
    });
  }

  // Static utility method

  public static KAIFromHydro(hydroValue: any): number {
    return fromHydro(hydroValue, 'kai');
  }

  public static HydroFromKAI(kaiValue: any) {
    return toHydro(kaiValue, 'kai');
  }
}

export default KAIChain;
