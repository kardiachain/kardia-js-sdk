import { Client, RequestManager, HTTPTransport } from '@open-rpc/client-js';
import KardiaContract from '../smc';

interface KRC39Props {
  client?: Client;
  provider?: string;
  address?: string;
}

class KRC39 {
  private _rpcClient: Client;
  public address: string = '';

  private _smcInstance: KardiaContract;

  constructor({ client, address, provider }: KRC39Props) {
    if (client) {
      this._rpcClient = client;
    } else if (provider) {
      const transport = new HTTPTransport(provider);
      this._rpcClient = new Client(new RequestManager([transport]));
    } else {
      throw new Error('Either [client] or [provider] must be provided');
    }

    this._smcInstance = new KardiaContract({ client: this._rpcClient });

    if (address) {
      this.address = address;
    }
  }

  public getContractInstance() {
    return this._smcInstance;
  }
}

export default KRC39;
