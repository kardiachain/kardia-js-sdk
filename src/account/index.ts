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

  public async getNonce(address: string) {
    return await this._rpcClient.request({
      method: 'account_nonce',
      params: [address],
    });
  }

  // Static utility method

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

  public static async getWalletFromMnemonic(
    mnemonic: string
  ): Promise<Record<string, any> | boolean> {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic.trim());
    const privateKey = wallet.privateKey;
    const addressStr = wallet.address;
    return {
      address: addressStr,
      privateKey,
      balance: 0,
    };
  }

  public static isAddress(address: string) {
    return isAddress(address);
  }

  public static generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const addressStr = wallet.address;

    return {
      address: addressStr,
      privateKey,
      balance: 0,
    };
  }

  public static toChecksumAddress(address: string) {
    return toChecksum(address);
  }
}

export default KardiaAccount;
