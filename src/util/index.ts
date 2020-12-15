import { removeTrailingZeros } from './string';
import * as EthUtil from 'ethereumjs-util';
import EtherWallet, {hdkey} from 'ethereumjs-wallet';
import * as Bip39 from 'bip39';

export const KardiaUtil = {
  weiToKAI: (value: any): number => {
    if (!value || value === '0') {
      return 0;
    }
  
    value = value.toLocaleString('en-US', {useGrouping: false});
  
    const cellString = value.toString().padStart(36, '0');
    const kaiNumString = parseInt(cellString.slice(0, 18), 10);
    const kaiDecimalString = cellString.slice(-18);
    return Number(
      `${removeTrailingZeros(`${kaiNumString}.${kaiDecimalString}`)}`,
    );
  },
  cellValue: (kaiValue: any) => {
    let cellString = removeTrailingZeros(kaiValue);
    let decimalStr = cellString.split('.')[1];
    let numberStr = cellString.split('.')[0];
    if (!decimalStr) {
      numberStr = numberStr.padEnd(18 + numberStr.length, '0');
    } else {
      decimalStr = decimalStr.padEnd(18, '0');
    }
    cellString = `${numberStr}${decimalStr || ''}`;
    return cellString;
  },
  getWalletFromPK: (privateKey: string) => {
    const privateKeyBuffer = EthUtil.toBuffer(privateKey);
    return EtherWallet.fromPrivateKey(privateKeyBuffer);
  },
  getWalletFromMnemonic: async (
    mnemonic: string,
  ): Promise<Record<string, any> | boolean> => {
    try {
      const seed = await Bip39.mnemonicToSeed(mnemonic);
      const root = hdkey.fromMasterSeed(seed);
      const masterWallet = root.getWallet();
      const privateKey = masterWallet.getPrivateKeyString();
      const addressStr = masterWallet.getAddressString();
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
};