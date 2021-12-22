import { RequestManager, HTTPTransport, Client } from '@open-rpc/client-js';
import KardiaAccount from './account';
import KAIChain from './kai';
import KardiaContract from './smc';
import KardiaTransaction from './transaction';
import KRC20 from './krc20';
import KardiaConnect from './kardiaConnect';
import { getVersion } from './util/helper';

interface KardiaClientProps {
  endpoint: string;
  chainId?: number;
}

class KardiaClient {
  private _rpcClient: Client;
  public account: KardiaAccount;
  public transaction: KardiaTransaction;
  public kaiChain: KAIChain;
  public contract: KardiaContract;
  public krc20: KRC20;
  constructor({ endpoint, chainId = 24 }: KardiaClientProps) {
    // Init RPC client
    const transport = new HTTPTransport(endpoint, {
      headers: {
        "User-Agent": `JS SDK / ${getVersion()}`
      }
    });
    this._rpcClient = new Client(new RequestManager([transport]));

    // Init sub module
    this.account = new KardiaAccount({ client: this._rpcClient });
    this.transaction = new KardiaTransaction({ client: this._rpcClient, chainId });
    this.kaiChain = new KAIChain({ client: this._rpcClient });
    this.contract = new KardiaContract({ client: this._rpcClient, chainId });
    this.krc20 = new KRC20({ client: this._rpcClient, chainId });
  }
}

export { KardiaTransaction, KardiaAccount, KAIChain, KRC20, KardiaContract, KardiaConnect };
export { KardiaUtils } from './util'
export default KardiaClient;
