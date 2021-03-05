import { Client } from '@open-rpc/client-js';
interface KardiaContractProps {
    client?: Client;
    provider?: string;
    bytecodes?: string;
    abi?: any[];
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
    constructor({ client, bytecodes, abi, provider }: KardiaContractProps);
    updateAbi(abi: any[]): void;
    updateByteCode(bytecodes: string): void;
    info(): {
        byteCode: string;
        abi: any[];
    };
    deploy({ params }: SMCDeployObject): {
        txData: () => string;
        getDefaultTxPayload: () => {
            amount: number;
            data: string;
            gasPrice: number;
            gas: number;
        };
        estimateGas: (txPayload?: Record<string, any>) => Promise<any>;
        send: (privateKey: string, txPayload?: Record<string, any>) => Promise<any>;
    };
    invokeContract(name: string, params: any[]): {
        txData: () => string;
        getDefaultTxPayload: () => {
            amount: number;
            gasPrice: number;
            gas: number;
            data: string;
        };
        estimateGas: (txPayload: Record<string, any>) => Promise<any>;
        send: (privateKey: string, contractAddress: string, txPayload?: Record<string, any>) => Promise<any>;
        call: (contractAddress: string, txPayload?: Record<string, any>, blockHeight?: any) => Promise<any>;
    };
    parseEvent(txHash: string): Promise<any>;
}
export default KardiaContract;
