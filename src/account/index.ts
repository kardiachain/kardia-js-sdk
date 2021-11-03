import { Client } from '@open-rpc/client-js';
import * as EthUtil from 'ethereumjs-util';
import EtherWallet from 'ethereumjs-wallet';
import { ethers } from 'ethers';
import { isAddress, toChecksum } from '../util/account';

interface KardiaAccountProps {
  client: Client;
}

interface BlockQuery {
  blockHash?: string;
  blockHeight?: number;
}

class KardiaAccount {
  private _rpcClient: Client;
  constructor({ client }: KardiaAccountProps) {
    this._rpcClient = client;
  }

  /**
   * Get account balance
   * @param address Address to get balance
   * @param options
   * @param options.blockHash Block hash to get balance
   * @param options.blockHeight Block height to get balance. If both `blockHash` and `blockHeight` is specified, `blockHash` will be used.
   */
  public async getBalance(address: string, options?: BlockQuery) {
    const params: any[] = [address];

    if (options && options.blockHash) {
      params.push(options.blockHash);
    } else if (options && options.blockHeight) {
      params.push(options.blockHeight);
    } else {
      params.push('latest');
    }

    return await this._rpcClient.request({
      method: 'account_balance',
      params,
    });
  }

  /**
   * Get account nonce
   * @param address Address to get nonce
   */
  public async getNonce(address: string) {
    return await this._rpcClient.request({
      method: 'account_nonce',
      params: [address],
    });
  }

  // Static utility method

  /**
   * Get wallet from private key
   * @param privateKey Private key to generate wallet
   */
  public static getWalletFromPK(privateKey: string) {
    const privateKeyBuffer = EthUtil.toBuffer(privateKey);
    const wallet = EtherWallet.fromPrivateKey(privateKeyBuffer);
    const addressStr = wallet.getChecksumAddressString();
    return {
      address: addressStr,
      privateKey,
      balance: 0,
    };
  }

  /**
   * Get wallet from mnemonic phrase
   * @param mnemonic Mnemonic phrase to generate
   * @param path Mnemonic path
   */
  public static async getWalletFromMnemonic(
    mnemonic: string,
    path?: string
  ): Promise<Record<string, any> | boolean> {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic.trim(), path);
    const privateKey = wallet.privateKey;
    const addressStr = wallet.address;
    return {
      address: addressStr,
      privateKey,
      balance: 0,
    };
  }

  /**
   * Check if an address is valid
   * @param address Address to validate
   */
  public static isAddress(address: string) {
    return isAddress(address);
  }

  /**
   * Generate new wallet with mnemonic phrase
   */
  public static generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const addressStr = wallet.address;

    return {
      address: addressStr,
      privateKey,
      mnemonic: wallet.mnemonic,
      balance: 0,
    };
  }

  /**
   * Get checksum version from address
   * @param address Original address
   */
  public static toChecksumAddress(address: string) {
    return toChecksum(address);
  }

  public async isContract(address: string) {
    const checksumAddress = KardiaAccount.toChecksumAddress(address)
    const code = await this._rpcClient.request({
      method: 'account_getCode',
      params: [checksumAddress],
    });

    return code !== '0x'
  }
}

export default KardiaAccount;
