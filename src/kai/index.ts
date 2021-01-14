import { Client } from '@open-rpc/client-js';
import { removeTrailingZeros } from '../util/string';
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

  // Static utility method

  public static weiToKAI(value: any): number {
    if (!value || value === '0') {
      return 0;
    }

    value = value.toLocaleString('en-US', { useGrouping: false });

    const cellString = value.toString().padStart(36, '0');
    const kaiNumString = parseInt(cellString.slice(0, 18), 10);
    const kaiDecimalString = cellString.slice(-18);
    return Number(
      `${removeTrailingZeros(`${kaiNumString}.${kaiDecimalString}`)}`
    );
  }

  public static cellValue(kaiValue: any) {
    let cellString = removeTrailingZeros(kaiValue);
    let decimalStr = cellString.split('.')[1];
    let numberStr = cellString.split('.')[0];
    if (!decimalStr) {
      numberStr = numberStr.padEnd(18 + numberStr.length, '0');
    } else {
      decimalStr = decimalStr.padEnd(18, '0');
    }
    cellString = `${numberStr}${decimalStr || ''}`;
    return cellString;
  }
}

export default KAIChain;
