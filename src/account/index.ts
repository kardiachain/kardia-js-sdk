import { Client } from '@open-rpc/client-js';
import * as EthUtil from 'ethereumjs-util';
import EtherWallet from 'ethereumjs-wallet';
import { isAddress } from '../util/string';
import { ethers } from 'ethers';

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
    return EtherWallet.fromPrivateKey(privateKeyBuffer);
  }

  public static async getWalletFromMnemonic(
    mnemonic: string
  ): Promise<Record<string, any> | boolean> {
    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic.trim());
      const privateKey = wallet.privateKey;
      const addressStr = wallet.address;

      return {
        address: addressStr,
        privateKey,
        balance: 0,
      };
    } catch (error) {
      console.error(error);
      return false;
    }
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
}

export default KardiaAccount;
