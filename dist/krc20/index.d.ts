import { Client } from '@open-rpc/client-js';
import KardiaContract from '../smc';
interface KRC20Props {
    client?: Client;
    provider?: string;
    address?: string;
    name?: string;
    symbol?: string;
    decimals?: number;
    abi?: Record<string, any>[];
}
declare class KRC20 {
    private _rpcClient;
    address: string;
    name: string;
    decimals: number;
    symbol: string;
    abi: Record<string, any>[];
    private _smcInstance;
    constructor({ client, address, name, decimals, symbol, provider, abi, }: KRC20Props);
    /**
     * Set custom ABI to use KRC20 token
     * @param abi Custom ABI
     */
    setCustomABI(abi: Record<string, any>[]): void;
    private validateAddress;
    /**
     * Get contract instance to use custom function
     */
    getContractInstance(): KardiaContract;
    /**
     * Get token name
     * @param fetch Flag to indicate if get from network or from local cache
     */
    getName(fetch?: boolean): Promise<string>;
    /**
     * Get token decimals
     * @param fetch Flag to indicate if get from network or from local cache
     */
    getDecimals(fetch?: boolean): Promise<number>;
    /**
     * Get token symbol
     * @param fetch Flag to indicate if get from network or from local cache
     */
    getSymbol(fetch?: boolean): Promise<string>;
    /**
     * Get token total supply
     * @param format Format to return, can be "string", "BigNumber" or "number"
     */
    getTotalSupply(format?: 'string' | 'BigNumber' | 'number'): Promise<any>;
    /**
     * Get data from network to save to local cache
     * @param address Contract address
     */
    getFromAddress(address: string): Promise<void>;
    /**
     * Get balance of address
     * @param address Address to get balance
     */
    balanceOf(address: string): Promise<any>;
    /**
     * Transfer raw amount of token
     * @param privateKey Private key of wallet to send
     * @param to Receiver's address
     * @param amount Raw amount of token to transfer
     * @param transferPayload Custom tx payload
     * @param waitUntilMined Wait for tx to be mined or not
     */
    transferRaw(privateKey: string, to: string, amount: string, transferPayload?: Record<string, any>, waitUntilMined?: boolean): Promise<any>;
    /**
     * Transfer token
     * @param privateKey Private key of wallet to send
     * @param to Receiver's address
     * @param amount Amount of token to transfer
     * @param transferPayload Custom tx payload
     * @param waitUntilMined Wait for tx to be mined or not
     */
    transfer(privateKey: string, to: string, amount: number | string, transferPayload?: Record<string, any>, waitUntilMined?: boolean): Promise<any>;
    /**
     * Estimate gas for tx
     * @param to Receiver's address
     * @param amount Amount of token to transfer
     */
    estimateGas(to: string, amount: number): Promise<number>;
}
export default KRC20;
