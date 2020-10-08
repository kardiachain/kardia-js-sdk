import { keccak256 } from 'js-sha3';
import BN from 'bn.js';
import { isString, isNumber, isBoolean, isObject } from 'lodash';

export const isHexStrict = (hex: string) => {
    return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};

const SHA3_NULL_S =
    '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

const sha3 = (value: string) => {
    if (isHexStrict(value) && /^0x/i.test(value.toString())) {
        value = hexToBytes(value);
    }

    var returnValue = keccak256(value); // jshint ignore:line

    if (returnValue === SHA3_NULL_S) {
        return null;
    } else {
        return returnValue;
    }
};

const isBigNumber = (object: any) =>
  object &&
  (object instanceof BN ||
    (object.constructor && object.constructor.name === 'BigNumber'));

export const toHex = (value, returnType = false) => {
    /*jshint maxcomplexity: false */

    if (isAddress(value)) {
        return returnType
            ? 'address'
            : '0x' + value.toLowerCase().replace(/^0x/i, '');
    }

    if (isBoolean(value)) {
        return returnType ? 'bool' : value ? '0x01' : '0x00';
    }

    if (isObject(value) && !isBigNumber(value) && !isBN(value)) {
        return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
    }

    // if its a negative number, pass it through numberToHex
    if (isString(value)) {
        if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
            return returnType ? 'int256' : numberToHex(value);
        } else if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
            return returnType ? 'bytes' : value;
        } else if (!isFinite(value)) {
            return returnType ? 'string' : utf8ToHex(value);
        }
    }

    return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
};

const checkAddressChecksum = (address: string) => {
    // Check each case
    address = address.replace(/^0x/i, '');
    const sha3Result = sha3(address.toLowerCase())
    if (sha3Result === null) return false
    let addressHash = sha3Result.replace(/^0x/i, '');

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

export const toHex = (value: any, returnType = false) => {
    /*jshint maxcomplexity: false */

    if (isAddress(value)) {
        return returnType
            ? 'address'
            : '0x' + value.toLowerCase().replace(/^0x/i, '');
    }

    if (isBoolean(value)) {
        return returnType ? 'bool' : value ? '0x01' : '0x00';
    }

    if (isObject(value) && !isBigNumber(value) && !isBN(value)) {
        return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
    }

    // if its a negative number, pass it through numberToHex
    if (isString(value)) {
        if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
            return returnType ? 'int256' : numberToHex(value);
        } else if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
            return returnType ? 'bytes' : value;
        } else if (!isFinite(value)) {
            return returnType ? 'string' : utf8ToHex(value);
        }
    }

    return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
};