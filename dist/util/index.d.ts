import * as bytes from './bytes';
export declare const KardiaUtils: {
    fromHydro: (input: any, unit: "hydro" | "oxy" | "kai") => any;
    toHydro: (input: any, unit: "hydro" | "oxy" | "kai") => any;
    toChecksum: (address: string) => string;
    checkAddressChecksum: (address: string) => boolean;
    isAddress: (address: string) => boolean;
    fromPrivate: (privateKey: string) => {
        address: string;
        privateKey: string;
    };
    bytes: typeof bytes;
};
