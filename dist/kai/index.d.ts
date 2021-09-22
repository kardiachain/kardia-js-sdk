import { Client } from '@open-rpc/client-js';
interface KAIProps {
    client: Client;
}
declare class KAIChain {
    private _rpcClient;
    constructor({ client }: KAIProps);
    /**
     * Get net version
     */
    netVersion(): Promise<any>;
    /**
     * Get current block number
     */
    getBlockNumber(): Promise<any>;
    /**
     * Check if an address is a validator
     * @param address Address to check
     */
    isValidator(address: string): Promise<boolean>;
    /**
     * Get list of current validators
     * @param withDelegators Indicate if get delegators too
     */
    getValidators(withDelegators?: boolean): Promise<any>;
    /**
     * Get block data from block number
     * @param blockNumber Block number to get data
     */
    getBlockByBlockNumber(blockNumber: number): Promise<any>;
    /**
     * Get block data from block hash
     * @param blockHash Block hash to get data
     */
    getBlockByHash(blockHash: string): Promise<any>;
    /**
     * Get block header from block number
     * @param blockNumber Block number to get header
     */
    getBlockHeaderByBlockNumber(blockNumber: number): Promise<any>;
    /**
     * Get block header from block hash
     * @param blockHash Block number to get hash
     */
    getBlockHeaderByHash(blockHash: string): Promise<any>;
    newFilter({ fromBlock, toBlock, address, topics }: {
        fromBlock?: 'latest' | number;
        toBlock?: 'latest' | number;
        address?: string;
        topics?: string[];
    }): Promise<any>;
    newBlockFilter(): Promise<any>;
    uninstallFilter(filterId: string): Promise<any>;
    getFilterChanges(filterId: string): Promise<any>;
    getFilterLogs(filterId: string): Promise<any>;
    getLogs(fromBlock?: 'latest' | number, toBlock?: 'latest' | number, address?: string, topics?: [], blockhash?: any): Promise<any>;
    getGasPrice(): Promise<any>;
    static KAIFromHydro(hydroValue: any): number;
    static HydroFromKAI(kaiValue: any): any;
}
export default KAIChain;
