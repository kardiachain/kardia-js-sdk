import KardiaAccount from './account';
import KAIChain from './kai';
import KardiaContract from './smc';
import KardiaTransaction from './transaction';
interface KardiaClientProps {
    endpoint: string;
}
declare class KardiaClient {
    private _rpcClient;
    account: KardiaAccount;
    transaction: KardiaTransaction;
    kaiChain: KAIChain;
    contract: KardiaContract;
    constructor({ endpoint }: KardiaClientProps);
}
export { KardiaTransaction, KardiaAccount, KAIChain };
export default KardiaClient;
