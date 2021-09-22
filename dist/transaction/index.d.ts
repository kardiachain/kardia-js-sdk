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
    /**
     * Get transaction detail from transaction hash
     */
    getTransaction(txHash: string): Promise<any>;
    /**
     * Get node's pending transactions
     */
    getPendingTransaction(): Promise<any>;
    /**
     * Get transaction receipt from transaction hash
     * @param txHash Transaction hash
     */
    getTransactionReceipt(txHash: string): Promise<any>;
    /**
     * Send transaction to Chrome extension for signing and sending to blockchain
     * @param data transaction params
     * @param waitUntilMined wait for transaction to complete or not
     * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
     */
    sendTransactionToExtension(data: any, waitUntilMined?: boolean, waitTimeOut?: number): Promise<any>;
    /**
     * Sign a transaction using provided private key
     * @param tx Transaction payload. For more information, refer to https://docs.kardiachain.io/js-sdk/reference/objects-reference#transaction-payload
     * @param privateKey Private key used for signing
     */
    signTransaction(tx: TxParams, privateKey: string): {
        messageHash: string;
        v: string;
        r: string;
        s: string;
        rawTransaction: string;
    };
    /**
     * Generate a transaction object used for signing
     * @param txParam Transaction's params
     * @param txParam.receiver Transaction receiver
     * @param txParam.to Alias of txParams.receiver
     * @param txParam.amount Transaction amount
     * @param txParam.value Alias of txParams.amount
     * @param txParam.nonce Transaction nonce
     * @param txParam.gasPrice Transaction gas price
     * @param txParam.gas Transaction gas limit
     * @param txParam.gasLimit Alias of amount txParams.gas
     * @param txParam.data Transaction data
     */
    generateTransaction({ receiver, to, amount, value, nonce, gasPrice, gas, gasLimit, data, }: any): TxParams;
    /**
     * Send signed transaction to blockchain
     * @param rawTx Hex string represent signed transaction
     * @param waitUntilMined wait for transaction to complete or not
     * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
     */
    sendRawTransaction(rawTx: any, waitUntilMined?: boolean, waitTimeOut?: number): Promise<any>;
    /**
     * Sign and send transaction to blockchain
     * @param data transaction params
     * @param privateKey Private key used to sign transaction
     * @param waitUntilMined wait for transaction to complete or not
     * @param waitTimeOut Time (in milliseconds) to wait for transaction to complete
     */
    sendTransaction(data: any, privateKey: string, waitUntilMined?: boolean, waitTimeOut?: number): Promise<any>;
    /**
     * Estimate gas cost
     * @param txPayload Transaction payload. For more information, refer to https://docs.kardiachain.io/js-sdk/reference/objects-reference#transaction-payload
     * @param data Hex string represent transaction data
     */
    estimateGas(txPayload: any, data: string): Promise<any>;
    /**
     * Debug transaction
     * @param txHash Transaction hash to debug
     */
    debugTransaction(txHash: string): Promise<any>;
}
export default KardiaTransaction;
