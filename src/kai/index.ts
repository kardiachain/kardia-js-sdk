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

  /**
   * Get net version
   */
  public async netVersion() {
    return await this._rpcClient.request({
      method: 'net_version',
      params: [],
    });
  }

  /**
   * Get current block number
   */
  public async getBlockNumber() {
    return await this._rpcClient.request({
      method: 'kai_blockNumber',
      params: [],
    });
  }

  /**
   * Check if an address is a validator
   * @param address Address to check
   */
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

  /**
   * Get list of current validators
   * @param withDelegators Indicate if get delegators too
   */
  public async getValidators(withDelegators: boolean = false) {
    return await this._rpcClient.request({
      method: 'kai_validators',
      params: [withDelegators],
    });
  }

  /**
   * Get block data from block number
   * @param blockNumber Block number to get data
   */
  public async getBlockByBlockNumber(blockNumber: number) {
    if (blockNumber < 0) {
      throw new Error('Invalid block number');
    }
    return await this._rpcClient.request({
      method: 'kai_getBlockByNumber',
      params: [blockNumber],
    });
  }

  /**
   * Get block data from block hash
   * @param blockHash Block hash to get data
   */
  public async getBlockByHash(blockHash: string) {
    return await this._rpcClient.request({
      method: 'kai_getBlockByHash',
      params: [blockHash],
    });
  }

  /**
   * Get block header from block number
   * @param blockNumber Block number to get header
   */
  public async getBlockHeaderByBlockNumber(blockNumber: number) {
    if (blockNumber < 0) {
      throw new Error('Invalid block number');
    }
    return await this._rpcClient.request({
      method: 'kai_getBlockHeaderByNumber',
      params: [blockNumber],
    });
  }

  /**
   * Get block header from block hash
   * @param blockHash Block number to get hash
   */
  public async getBlockHeaderByHash(blockHash: string) {
    return await this._rpcClient.request({
      method: 'kai_getBlockHeaderByHash',
      params: [blockHash],
    });
  }

  public async newFilter({
    fromBlock = 'latest',
    toBlock = 'latest',
    address,
    topics = []
  }: {
    fromBlock?: 'latest' | number,
    toBlock?: 'latest' | number,
    address?: string,
    topics?: string[]
  }) {

    const param: Record<string, any> = {fromBlock, toBlock};

    if (address) param.address = address;
    if (topics && topics.length > 0) param.topics = topics;

    return await this._rpcClient.request({
      method: 'kai_newFilter',
      params: [param],
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

  public async getLogs(
    fromBlock?: 'latest' | number,
    toBlock?: 'latest' | number,
    address?: string,
    topics?: [],
    blockhash?: any
  ) {
    return await this._rpcClient.request({
      method: 'kai_getLogs',
      params: [
        {
          fromBlock: fromBlock,
          toBlock: toBlock,
          address: address,
          topics: topics,
          blockhash: blockhash,
        },
      ],
    });
  }

  public async getGasPrice() {
    return await this._rpcClient.request({
      method: 'kai_gasPrice',
      params: [],
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
