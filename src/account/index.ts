import { Client } from '@open-rpc/client-js';

interface KardiaAccountProps {
  client: Client;
}

interface BlockQuery {
  blockHash?: string;
  blockHeight?: number;
}

class KardiaAccount {
  private _rpcClient: Client;
  constructor({ client }: KardiaAccountProps) {
    this._rpcClient = client;
  }

  public async getBalance(address: string, options?: BlockQuery) {
    const params: any[] = [address];

    if (options && options.blockHash) {
      params.push(options.blockHash);
    } else {
      params.push(null);
    }

    if (options && options.blockHeight) {
      params.push(options.blockHeight);
    } else {
      params.push(null);
    }

    return await this._rpcClient.request({
      method: 'account_balance',
      params,
    });
  }

  public async getNonce(address: string) {
    return await this._rpcClient.request({
      method: 'account_nonce',
      params: [address],
    });
  }
}

export default KardiaAccount;
