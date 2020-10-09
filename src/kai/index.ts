import { Client } from '@open-rpc/client-js';
interface KAIProps {
  client: Client;
}

class KAI {
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

  public async isValidator() {
    const result = await this._rpcClient.request({
      method: 'kai_validator',
      params: [],
    });
    if (result) return true;
    return false;
  }

  public async getValidators() {
    return await this._rpcClient.request({
      method: 'kai_validators',
      params: [],
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

  public async getBasicBlockByNumber(blockNumber: number) {
    if (blockNumber < 0) {
      throw new Error('Invalid block number');
    }
    return await this._rpcClient.request({
      method: 'kai_getBasicBlockByNumber',
      params: [blockNumber],
    });
  }

  public async getBasicBlockByHash(blockHash: string) {
    return await this._rpcClient.request({
      method: 'kai_getBasicBlockByHash',
      params: [blockHash],
    });
  }

  // public async call(smc: string) {

  // }
}

export default KAI;
