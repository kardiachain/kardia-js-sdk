import { Client } from '@open-rpc/client-js';
interface KardiaAccountProps {
    client: Client;
}
interface BlockQuery {
    blockHash?: string;
    blockHeight?: number;
}
declare class KardiaAccount {
    private _rpcClient;
    constructor({ client }: KardiaAccountProps);
    getBalance(address: string, options?: BlockQuery): Promise<any>;
    getNonce(address: string): Promise<any>;
    static getWalletFromPK(privateKey: string): {
        address: string;
        privateKey: string;
        balance: number;
    };
    static getWalletFromMnemonic(mnemonic: string): Promise<Record<string, any> | boolean>;
    static isAddress(address: string): boolean;
    static generateWallet(): {
        address: string;
        privateKey: string;
        balance: number;
    };
}
export default KardiaAccount;
