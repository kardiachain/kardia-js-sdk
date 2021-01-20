import { Client } from '@open-rpc/client-js';
import EtherWallet from 'ethereumjs-wallet';
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
    static getWalletFromPK(privateKey: string): EtherWallet;
    static getWalletFromMnemonic(mnemonic: string): Promise<Record<string, any> | boolean>;
    static isAddress(address: string): boolean;
}
export default KardiaAccount;
