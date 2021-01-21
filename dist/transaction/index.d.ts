import { Client } from '@open-rpc/client-js';
interface KardiaTransactionProps {
    client?: Client;
    provider?: string;
}
interface TxParams {
    nonce: any;
    to: string;
    gasPrice: any;
    gas: any;
    value: string;
    data: string;
}
declare class KardiaTransaction {
    private _rpcClient;
    constructor({ client, provider }: KardiaTransactionProps);
    getTransaction(txHash: string): Promise<any>;
    getPendingTransaction(): Promise<any>;
    getTransactionReceipt(txHash: string): Promise<any>;
    signTransaction(tx: TxParams, privateKey: string): Promise<{
        messageHash: string;
        v: string;
        r: string;
        s: string;
        rawTransaction: string;
    }>;
    generateTransaction({ receiver, to, amount, value, nonce, gasPrice, gas, gasLimit, data, }: any): TxParams;
    sendTransaction(data: any, privateKey: string, waitUntilMined?: boolean): Promise<any>;
}
export default KardiaTransaction;
