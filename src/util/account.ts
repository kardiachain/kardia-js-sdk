import elliptic from 'elliptic';
// import { keccak256, keccak256s } from './hash';
import { fromString } from './nat';
import Bytes from './bytes';
import { keccak256 } from 'js-sha3';

const secp256k1 = new elliptic.ec('secp256k1');

const toChecksum = (address: string) => {
    const addressHash = keccak256(address.slice(2));
    let checksumAddress = '0x';
    for (let i = 0; i < 40; i++)
      checksumAddress +=
        parseInt(addressHash[i + 2], 16) > 7
          ? address[i + 2].toUpperCase()
          : address[i + 2];
    return checksumAddress;
};

export const fromPrivate = (privateKey: string) => {
    const buffer = Buffer.from(privateKey.slice(2), 'hex');
    const ecKey = secp256k1.keyFromPrivate(buffer);
    const publicKey = '0x' + ecKey.getPublic(false, 'hex').slice(2);
    const publicHash = keccak256(publicKey);
    const address = toChecksum('0x' + publicHash.slice(-40));
    return {
      address: address,
      privateKey: privateKey
    };
};

const encodeSignature = ([v, r, s]: any[]) => Bytes.flatten([r, s, v]);

export const decodeSignature = (hex: string) => [
    Bytes.slice(64, Bytes.length(hex), hex),
    Bytes.slice(0, 32, hex),
    Bytes.slice(32, 64, hex)
];

const makeSigner = (addToV: number) => (hash: string, privateKey: string) => {
    const signature = secp256k1
        .keyFromPrivate(Buffer.from(privateKey.slice(2), 'hex'))
        .sign(Buffer.from(hash.slice(2), 'hex'), { canonical: true });
    let number = 0;
    if (signature) number = signature.recoveryParam as number
    return encodeSignature([
        fromString(Bytes.fromNumber(addToV + number)),
        Bytes.pad(32, Bytes.fromNat('0x' + signature.r.toString(16))),
        Bytes.pad(32, Bytes.fromNat('0x' + signature.s.toString(16)))
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