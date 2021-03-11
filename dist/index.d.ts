import KardiaAccount from './account';
import KAIChain from './kai';
import KardiaContract from './smc';
import KardiaTransaction from './transaction';
import KRC20 from './krc20';
interface KardiaClientProps {
    endpoint: string;
}
declare class KardiaClient {
    private _rpcClient;
    account: KardiaAccount;
    transaction: KardiaTransaction;
    kaiChain: KAIChain;
    contract: KardiaContract;
    krc20: KRC20;
    constructor({ endpoint }: KardiaClientProps);
}
export { KardiaTransaction, KardiaAccount, KAIChain, KRC20 };
export default KardiaClient;
