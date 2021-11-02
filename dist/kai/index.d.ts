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
    /**
     * Create new filter to listen for contract's events. Reference: https://docs.kardiachain.io/js-sdk/guides/smart-contract-module#listen-for-smart-contracts-event
     * @param options Filter options
     * @param options.fromBlock Block to start listening for event
     * @param options.toBlock Block to end listening for event
     * @param options.address Contract address
     * @param options.topics Array of topics to listen for
     */
    newFilter({ fromBlock, toBlock, address, topics }: {
        fromBlock?: 'latest' | number;
        toBlock?: 'latest' | number;
        address?: string;
        topics?: string[];
    }): Promise<any>;
    /**
     * Create new filter to listen for new blocks.
     */
    newBlockFilter(): Promise<any>;
    /**
     * Remove a filter after used
     * @param fitlerID Filter ID to remove
     */
    uninstallFilter(filterId: string): Promise<any>;
    /**
     * Get filter changes
     * @param fitlerID Filter ID to get changes
     */
    getFilterChanges(filterId: string): Promise<any>;
    /**
     * Get filter logs
     * @param fitlerID Filter ID to get changes
     */
    getFilterLogs(filterId: string): Promise<any>;
    /**
     * Get all logs matching a given filter object.
     * @param options Filter options
     * @param options.fromBlock Block to start listening for event
     * @param options.toBlock Block to end listening for event
     * @param options.address Contract address
     * @param options.topics Array of topics to listen for
     * @param options.blockhash block hash which restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. If blockHash is present in in the filter criteria, then neither fromBlock nor toBlock are allowed.
     */
    getLogs(fromBlock?: 'latest' | number, toBlock?: 'latest' | number, address?: string, topics?: [], blockhash?: any): Promise<any>;
    /**
     * Get recommended gas price
     */
    getGasPrice(): Promise<any>;
    /**
     * Convert from Hydro to KAI
     * @param hydroValue Hydro value to convert
     */
    static KAIFromHydro(hydroValue: any): number;
    /**
     * Convert from KAI to Hydro
     * @param kaiValue KAI value to convert
     */
    static HydroFromKAI(kaiValue: any): any;
}
export default KAIChain;
