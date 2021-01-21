import { Client } from '@open-rpc/client-js';
interface KAIProps {
    client: Client;
}
declare class KAIChain {
    private _rpcClient;
    constructor({ client }: KAIProps);
    getBlockNumber(): Promise<any>;
    isValidator(address: string): Promise<boolean>;
    getValidators(): Promise<any>;
    getBlockByBlockNumber(blockNumber: number): Promise<any>;
    getBlockByHash(blockHash: string): Promise<any>;
    getBlockHeaderByBlockNumber(blockNumber: number): Promise<any>;
    getBlockHeaderByHash(blockHash: string): Promise<any>;
    static weiToKAI(value: any): number;
    static cellValue(kaiValue: any): any;
}
export default KAIChain;
