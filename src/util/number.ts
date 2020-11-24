import { padToEven } from './string';

/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
export const intToBuffer = (i: number) => {
  const hex = intToHex(i);

  return Buffer.from(padToEven(hex.slice(2)), 'hex');
};

/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
export const intToHex = (i: number) => {
    let hex = i.toString(16); // eslint-disable-line

  return `0x${hex}`;
};
