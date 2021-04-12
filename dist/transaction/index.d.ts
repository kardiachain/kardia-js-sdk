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
    sendTransactionToExtension(data: any, waitUntilMined?: boolean, waitTimeOut?: number): Promise<any>;
    signTransaction(tx: TxParams, privateKey: string): Promise<{
        messageHash: string;
        v: string;
        r: string;
        s: string;
        rawTransaction: string;
    }>;
    generateTransaction({ receiver, to, amount, value, nonce, gasPrice, gas, gasLimit, data, }: any): TxParams;
    /**
     *
     * @param data transaction params
     * @param privateKey Private key used to sign transaction
     * @param waitUntilMined wait for transaction to complete or not
     * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
     */
    sendTransaction(data: any, privateKey: string, waitUntilMined?: boolean, waitTimeOut?: number): Promise<any>;
    estimateGas(txPayload: any, data: string): Promise<any>;
}
export default KardiaTransaction;
