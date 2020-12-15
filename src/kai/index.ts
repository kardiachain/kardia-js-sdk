import { Client } from '@open-rpc/client-js';
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
    const result = await this._rpcClient.request({
      method: 'kai_validator',
      params: [address, false],
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
}

export default KAIChain;
