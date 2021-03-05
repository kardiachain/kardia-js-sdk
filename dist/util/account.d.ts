export declare const toChecksum: (address: string) => string;
export declare const checkAddressChecksum: (address: string) => boolean;
export declare const isAddress: (address: string) => boolean;
export declare const fromPrivate: (privateKey: string) => {
    address: string;
    privateKey: string;
};
export declare const decodeSignature: (hex: string) => string[];
export declare const trimLeadingZero: (hex: string) => string;
export declare const makeEven: (hex: string) => string;
export declare const sign: (hash: string, privateKey: string) => string;
