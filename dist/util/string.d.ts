/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
export declare const isHexString: (value: string, length?: number | undefined) => boolean;
export declare const isHexStrict: (hex: string) => boolean;
export declare const isHexPrefixed: (str: string) => boolean;
export declare const stripHexPrefix: (str: string) => string;
export declare const padToEven: (value: string) => string;
export declare const setLengthRight: (msg: any, length: number) => any;
export declare const isBN: (object: any) => boolean;
export declare const utf8ToHex: (str: string) => string;
export declare const isAddress: (address: string) => boolean;
export declare const toBN: (number: any) => any;
export declare const numberToHex: (value: any) => any;
export declare const toHex: (value: any, returnType?: boolean) => any;
export declare const removeTrailingZeros: (value: any) => any;
