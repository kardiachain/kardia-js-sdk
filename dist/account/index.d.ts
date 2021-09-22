import { Client } from '@open-rpc/client-js';
import { ethers } from 'ethers';
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
    /**
     * Get account balance
     * @param address Address to get balance
     * @param options
     * @param options.blockHash Block hash to get balance
     * @param options.blockHeight Block height to get balance. If both `blockHash` and `blockHeight` is specified, `blockHash` will be used.
     */
    getBalance(address: string, options?: BlockQuery): Promise<any>;
    /**
     * Get account nonce
     * @param address Address to get nonce
     */
    getNonce(address: string): Promise<any>;
    /**
     * Get wallet from private key
     * @param privateKey Private key to generate wallet
     */
    static getWalletFromPK(privateKey: string): {
        address: string;
        privateKey: string;
        balance: number;
    };
    /**
     * Get wallet from mnemonic phrase
     * @param mnemonic Mnemonic phrase to generate
     */
    static getWalletFromMnemonic(mnemonic: string): Promise<Record<string, any> | boolean>;
    /**
     * Check if an address is valid
     * @param address Address to validate
     */
    static isAddress(address: string): boolean;
    /**
     * Generate new wallet with mnemonic phrase
     */
    static generateWallet(): {
        address: string;
        privateKey: string;
        mnemonic: ethers.utils.Mnemonic;
        balance: number;
    };
    /**
     * Get checksum version from address
     * @param address Original address
     */
    static toChecksumAddress(address: string): string;
}
export default KardiaAccount;
