import BN from 'bn.js';
import abiJs from 'ethereumjs-abi';
import { decodeOutput } from '.';
import { isHexPrefixed, stripHexPrefix } from '../string';

export const parseOutput = (outputs: any[], result: string) => {
  const outputTypes = outputs.map(output => output.type);
  const outputBuffer = Buffer.from(result.replace('0x', ''), 'hex');
  const decodeResult = abiJs.rawDecode(outputTypes, outputBuffer);
  const rawOutput = decodeResult.map((decode, index) => {
    if (outputTypes[index].endsWith(']')) {
      const resultItems = decode.map((item: any) => {
        if (outputTypes[index].startsWith('byte')) {
          return item.toString('hex');
        }
        return item.toString();
      });
      return resultItems;
    }
    if (outputTypes[index].startsWith('byte')) {
      return decode.toString('hex');
    }
    return decode.toString();
  });
  return decodeOutput(outputs, rawOutput);
};

export const parseNumber = (arg: any) => {
  const type = typeof arg;
  if (type === 'string') {
    if (isHexPrefixed(arg)) {
      return new BN(stripHexPrefix(arg), 16);
    } else {
      return new BN(arg, 10);
    }
  } else if (type === 'number') {
    return new BN(arg);
  } else if (arg.toArray) {
    // assume this is a BN for the moment, replace with BN.isBN soon
    return arg;
  } else {
    throw new Error('Argument is not a number');
  }
};

// Parse N in type[<N>] where "type" can itself be an array type.
export const parseTypeArray = (type: string) => {
  const tmp = type.match(/(.*)\[(.*?)\]$/);
  if (tmp) {
    return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10);
  }
  return null;
};

export const parseTypeNxM = (type: string) => {
  const tmp = /^\D+(\d+)x(\d+)$/.exec(type);
  if (!tmp) throw new Error('Invalid [type]');
  return [parseInt(tmp[1], 10), parseInt(tmp[2], 10)];
};
