import { Client } from '@open-rpc/client-js';
interface KardiaContractProps {
    client?: Client;
    provider?: string;
    bytecodes?: string;
    abi?: any[];
    chainId?: number;
}
interface SMCDeployObject {
    gasLimit?: number;
    gasPrice?: number;
    params: any[];
}
declare class KardiaContract {
    private _rpcClient;
    bytecodes: string;
    abi: any[];
    private txModule;
    constructor({ client, bytecodes, abi, provider, chainId }: KardiaContractProps);
    /**
     * Update contract ABI
     * @param abi Contract ABI to update
     */
    updateAbi(abi: any[]): void;
    /**
     * Update contract bytecode
     * @param bytecode Contract bytecode to update
     */
    updateByteCode(bytecodes: string): void;
    /**
     * Get contract ABI and bytecode
     * @param bytecode Contract bytecode to update
     */
    info(): {
        byteCode: string;
        abi: any[];
    };
    /**
     * Deploy contract to network
     * @param deployOptions Deploy options
     * @param deployOptions.gasLimit Gas limit for deploy transaction
     * @param deployOptions.gasPrice Gas price for deploy transaction
     * @param deployOptions.params Params for contract initialization
     */
    deploy({ params }: SMCDeployObject): {
        /**
         * Get deploy tx data
         */
        txData: () => string;
        /**
         * Get deploy tx default payload
         */
        getDefaultTxPayload: () => {
            amount: number;
            data: string;
            gasPrice: number;
            gas: number;
        };
        /**
         * Estimate gas for deploy tx
         * @param txPayload Custom tx payload for estimation
         */
        estimateGas: (txPayload?: Record<string, any>) => Promise<any>;
        /**
         * Send deploy tx
         * @param privateKey Private key of wallet to deploy
         * @param txPayload Custom tx payload
         * @param waitUntilMined Wait for tx to be mined or not
         */
        send: (privateKey: string, txPayload?: Record<string, any>, waitUntilMined?: boolean) => Promise<any>;
    };
    /**
     * Invoke contract function
     * @param name Function name
     * @param params Function params
     */
    invokeContract(name: string, params: any[]): {
        /**
         * Get tx data
         */
        txData: () => string;
        /**
         * Get invoke tx default payload
         */
        getDefaultTxPayload: () => {
            amount: number;
            gasPrice: number;
            data: string;
        };
        /**
         * Estimate gas for invoke tx
         * @param txPayload Custom tx payload for estimation
         */
        estimateGas: (txPayload: Record<string, any>) => Promise<any>;
        /**
         * Get full tx object
         */
        getTxObject: () => Promise<any>;
        /**
         * Send invocation, used when the invoked function would change state of contract
         * @param privateKey Private key of wallet to deploy
         * @param contractAddress Contract address to invoke
         * @param txPayload Custom tx payload
         * @param waitUntilMined Wait for tx to be mined or not
         */
        send: (privateKey: string, contractAddress: string, txPayload?: Record<string, any>, waitUntilMined?: boolean) => Promise<any>;
        /**
         * Call invocation, used when the invoked function only get data and keep the state of contract
         * @param contractAddress Contract address to invoke
         * @param txPayload Custom tx payload
         * @param blockHeight Block to invoke
         */
        call: (contractAddress: string, txPayload?: Record<string, any>, blockHeight?: any) => Promise<any>;
    };
    /**
     * Parse tx events using contract's ABI
     * @param txHash Hash of tx to parse
     */
    parseEvent(txHash: string): Promise<any>;
    parseEventFromLog(log: any): Record<string, any>;
}
export default KardiaContract;
