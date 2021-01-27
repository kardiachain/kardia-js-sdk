import elliptic from 'elliptic';
import { keccak256 } from './hash';
import { fromString } from './nat';
import Bytes from './bytes';
import { sha3 } from './string';

const secp256k1 = new elliptic.ec('secp256k1');

export const toChecksum = (address: string) => {
  if (typeof address === 'undefined') return '';

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error(
      'Given address "' + address + '" is not a valid Kardiachain address.'
    );
  }

  address = address.toLowerCase().replace(/^0x/i, '');
  const addressHash = keccak256(address).replace(/^0x/i, '');
  let checksumAddress = '0x';
  for (let i = 0; i < address.length; i++)
    checksumAddress +=
      parseInt(addressHash[i], 16) > 7 ? address[i].toUpperCase() : address[i];
  return checksumAddress;
};

export const checkAddressChecksum = (address: string) => {
  try {
    // Check each case
    address = address.replace(/^0x/i, '');
    const sha3Result = sha3(address.toLowerCase());
    if (sha3Result === null) return false;
    const addressHash = sha3Result.replace(/^0x/i, '');
    for (let i = 0; i < 40; i++) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if (
        (parseInt(addressHash[i], 16) > 7 &&
          address[i].toUpperCase() !== address[i]) ||
        (parseInt(addressHash[i], 16) <= 7 &&
          address[i].toLowerCase() !== address[i])
      ) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const isAddress = (address: string) => {
  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
    // If it's ALL lowercase or ALL upppercase
  } else if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
    // Otherwise check each case
  } else {
    return checkAddressChecksum(address);
  }
};

export const fromPrivate = (privateKey: string) => {
  const buffer = Buffer.from(privateKey.slice(2), 'hex');
  const ecKey = secp256k1.keyFromPrivate(buffer);
  const publicKey = '0x' + ecKey.getPublic(false, 'hex').slice(2);
  const publicHash = keccak256(publicKey);
  const address = toChecksum('0x' + publicHash.slice(-40));

  return {
    address: address,
    privateKey: privateKey,
  };
};

const encodeSignature = ([v, r, s]: any[]) => Bytes.flatten([r, s, v]);

export const decodeSignature = (hex: string) => [
  Bytes.slice(64, Bytes.length(hex), hex),
  Bytes.slice(0, 32, hex),
  Bytes.slice(32, 64, hex),
];

const makeSigner = (addToV: number) => (hash: string, privateKey: string) => {
  const signature = secp256k1
    .keyFromPrivate(Buffer.from(privateKey.slice(2), 'hex'))
    .sign(Buffer.from(hash.slice(2), 'hex'), { canonical: true });
  let number = 0;
  if (signature) number = signature.recoveryParam as number;
  return encodeSignature([
    fromString(Bytes.fromNumber(addToV + number)),
    Bytes.pad(32, Bytes.fromNat('0x' + signature.r.toString(16))),
    Bytes.pad(32, Bytes.fromNat('0x' + signature.s.toString(16))),
  ]);
};

export const trimLeadingZero = (hex: string) => {
  while (hex && hex.startsWith('0x0')) {
    hex = '0x' + hex.slice(3);
  }
  return hex;
};

export const makeEven = (hex: string) => {
  if (hex.length % 2 === 1) {
    hex = hex.replace('0x', '0x0');
  }
  return hex;
};

export const sign = makeSigner(27);
