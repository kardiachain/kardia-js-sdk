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
    setCustomABI(abi: Record<string, any>[]): void;
    private validateAddress;
    getContractInstance(): KardiaContract;
    getName(fetch?: boolean): Promise<string>;
    getDecimals(fetch?: boolean): Promise<number>;
    getSymbol(fetch?: boolean): Promise<string>;
    getTotalSupply(format?: 'string' | 'BigNumber' | 'number'): Promise<any>;
    getFromAddress(address: string): Promise<void>;
    balanceOf(address: string): Promise<any>;
    transfer(privateKey: string, to: string, amount: number, transferPayload?: Record<string, any>, waitUntilMined?: boolean): Promise<any>;
    estimateGas(to: string, amount: number): Promise<number>;
}
export default KRC20;
