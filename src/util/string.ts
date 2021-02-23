import { keccak256 } from 'js-sha3';
import BN from 'bn.js';
import utf8 from 'utf8';
import numberToBN from 'number-to-bn';
import { isString, isNumber, isBoolean, isObject } from 'lodash';
import { intToBuffer } from './number';
import { isAddress } from './account';

/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
export const isHexString = (value: string, length?: number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
};

export const isHexStrict = (hex: string) => {
  return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};

export const isHexPrefixed = (str: string) => {
  if (typeof str !== 'string') {
    return false;
  }

  return str.slice(0, 2) === '0x';
};

export const stripHexPrefix = (str: string) =>
  isHexPrefixed(str) ? str.slice(2) : str;

const toBuffer = (v: any) => {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (isHexString(v)) {
        v = Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }
  return v;
};

export const padToEven = (value: string) => {
  if (typeof value !== 'string') {
    throw new Error(
      `while padding to even, value must be string, is currently [${typeof value}], while padToEven.`
    );
  }

  if (value.length % 2) {
    return `0${value}`;
  }

  return value;
};

const zeros = (bytes: number) => Buffer.allocUnsafe(bytes).fill(0);

const setLength = (msg: any, length: number, right: boolean) => {
  const buf = zeros(length);
  msg = toBuffer(msg);
  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }
    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }
    return msg.slice(-length);
  }
};

export const setLengthRight = (msg: any, length: number) => {
  return setLength(msg, length, true);
};

const SHA3_NULL_S =
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

export const sha3 = (value: any) => {
  if (isBN(value)) {
    value = value.toString();
  }

  if (isHexStrict(value) && /^0x/i.test(value.toString())) {
    value = hexToBytes(value);
  }

  const returnValue = keccak256(value); // jshint ignore:line

  if (returnValue === SHA3_NULL_S) {
    return null;
  } else {
    return returnValue;
  }
};

/**
 * Convert a hex string to a byte array
 *
 * Note: Implementation from crypto-js
 *
 * @method hexToBytes
 * @param {string} hex
 * @return {Array} the byte array
 */
const hexToBytes = (hex: any) => {
  hex = hex.toString(16);

  if (!isHexStrict(hex)) {
    throw new Error('Given value "' + hex + '" is not a valid hex string.');
  }

  hex = hex.replace(/^0x/i, '');

  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }

  return bytes;
};

export const isBN = (object: any) =>
  object instanceof BN ||
  (object && object.constructor && object.constructor.name === 'BN');

const isBigNumber = (object: any) =>
  object &&
  (object instanceof BN ||
    (object.constructor && object.constructor.name === 'BigNumber'));

export const utf8ToHex = (str: string) => {
  str = utf8.encode(str);
  let hex = '';

  // remove \u0000 padding from either side
  str = str.replace(/^(?:\u0000)*/, '');
  str = str
    .split('')
    .reverse()
    .join('');
  str = str.replace(/^(?:\u0000)*/, '');
  str = str
    .split('')
    .reverse()
    .join('');

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // if (code !== 0) {
    const n = code.toString(16);
    hex += n.length < 2 ? '0' + n : n;
    // }
  }

  return '0x' + hex;
};

export const toBN = (number: any) => {
  try {
    return numberToBN(number);
  } catch (e) {
    throw new Error(e + ' Given value: "' + number + '"');
  }
};

export const numberToHex = (value: any) => {
  if (value === null || value === undefined) {
    return value;
  }

  if (!isFinite(value) && !isHexStrict(value)) {
    throw new Error('Given input "' + value + '" is not a number.');
  }

  const number = toBN(value);
  const result = number.toString(16);

  return number.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result;
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
    }
  }

  return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
};

export const removeTrailingZeros = (value: any) => {
  const regEx1 = /^[0]+/;
  const regEx2 = /[0]+$/;
  const regEx3 = /[.]$/;

  const valueInString = value.toString();

  let after = valueInString.replace(regEx1, ''); // Remove leading 0's

  if (after.indexOf('.') > -1) {
    after = after.replace(regEx2, ''); // Remove trailing 0's
  }
  after = after.replace(regEx3, ''); // Remove trailing decimal

  if (after.indexOf('.') === 0) {
    after = '0' + after;
  }
  return after ? after : 0;
};

export const numberToString = (arg: any) => {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(
        `while converting number to string, invalid number value '${arg}', should be a number matching (^-?[0-9.]+).`
      );
    }
    return arg;
  } else if (typeof arg === 'number') {
    return String(arg);
  } else if (
    typeof arg === 'object' &&
    arg.toString &&
    (arg.toTwos || arg.dividedToIntegerBy)
  ) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    } else {
      return arg.toString(10);
    }
  }
  throw new Error(
    `while converting number to string, invalid number value '${arg}' type ${typeof arg}.`
  );
};
