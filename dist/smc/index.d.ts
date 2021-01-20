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
    constructor({ client, bytecodes, abi, provider }: KardiaContractProps);
    updateAbi(abi: any[]): void;
    updateByteCode(bytecodes: string): void;
    info(): {
        byteCode: string;
        abi: any[];
    };
    estimateGas(txPayload: any, data: string): Promise<any>;
    deploy({ params }: SMCDeployObject): {
        txData: () => string;
        estimateGas: (txPayload?: Record<string, any>) => Promise<any>;
        send: (privateKey: string, txPayload?: Record<string, any>) => Promise<any>;
    };
    invokeContract(name: string, params: any[]): {
        txData: () => string;
        estimateGas: (txPayload?: {}) => Promise<any>;
        send: (privateKey: string, contractAddress: string, txPayload?: Record<string, any>) => Promise<any>;
        call: (contractAddress: string, txPayload?: Record<string, any>, blockHeight?: any) => Promise<any>;
    };
}
export default KardiaContract;
