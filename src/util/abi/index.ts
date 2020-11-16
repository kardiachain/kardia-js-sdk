import Bytes from '../bytes';
import BN from 'bn.js';
import { parseNumber, parseTypeArray, parseTypeNxM } from './parser';
import { fromNumber as natFromNumber } from '../nat';
import { isHexStrict, setLengthRight, toHex } from '../string';
import { keccak256s } from '../hash';

// Encodes a single item (can be dynamic array)
// @returns: String
const encodeSingle = (type: string, arg: any): string => {
    let size, num, i;

    if (type === 'address') {
        return encodeSingle('uint160', parseNumber(arg));
    } else if (type === 'bool') {
        return encodeSingle('uint8', arg ? 1 : 0);
    } else if (type === 'string') {
        return encodeSingle('bytes', Buffer.from(arg, 'utf8'));
    } else if (isArray(type)) {
        // this part handles fixed-length ([2]) and variable length ([]) arrays
        // NOTE: we catch here all calls to arrays, that simplifies the rest
        if (typeof arg.length === 'undefined') {
            throw new Error('Not an array?');
        }
        size = parseTypeArray(type);
        if (!size) throw new Error('Invalid [type]')
        if (size !== 'dynamic' && size !== 0 && arg.length > size) {
            throw new Error('Elements exceed array size: ' + size);
        }
        let result = '';
        type = type.slice(0, type.lastIndexOf('['));
        if (typeof arg === 'string') {
            arg = JSON.parse(arg);
        }

        if (size === 'dynamic') {
            let length = encodeSingle('uint256', arg.length);
            result = length;
        }
        for (i in arg) {
            result = result + encodeSingle(type, arg[i]).replace('0x', '');
        }
        return result;
    } else if (type === 'bytes') {
        const length = Bytes.length(arg);
        const nextMul32 = ((((length - 1) / 32) | 0) + 1) * 32;
        const lengthEncoded = encode('uint256', natFromNumber(length)).data;
        const bytesEncoded = Bytes.padRight(nextMul32, arg);
        return Bytes.concat(lengthEncoded, bytesEncoded);
    } else if (type.startsWith('bytes')) {
        size = parseTypeN(type);
        if (size < 1 || size > 32) {
            throw new Error('Invalid bytes<N> width: ' + size);
        }

        const result = '0x' + setLengthRight(arg, 32).toString('hex');
        return result;
    } else if (type.startsWith('uint')) {
        size = parseTypeN(type);
        if (size % 8 || size < 8 || size > 256) {
            throw new Error('Invalid uint<N> width: ' + size);
        }

        num = parseNumber(arg);
        if (num.bitLength() > size) {
            throw new Error(
                'Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength(),
            );
        }

        if (num < 0) {
            throw new Error('Supplied uint is negative');
        }
        // const bytes32 = zeros(size === 256 ? 31 : 32);
        // return Buffer.concat([bytes32, num.toArrayLike(Buffer, 'be')]);
        const buf = '0x' + num.toArrayLike(Buffer, 'be', 32).toString('hex');
        return buf;
    } else if (type.startsWith('int')) {
        size = parseTypeN(type);
        if (size % 8 || size < 8 || size > 256) {
            throw new Error('Invalid int<N> width: ' + size);
        }

        num = parseNumber(arg);
        if (num.bitLength() > size) {
            throw new Error(
                'Supplied int exceeds width: ' + size + ' vs ' + num.bitLength(),
            );
        }

        const buf = num.toTwos(256).toArrayLike(Buffer, 'be', 32);
        return '0x' + buf.toString('hex');
    } else if (type.startsWith('ufixed')) {
        size = parseTypeNxM(type);

        num = parseNumber(arg);

        if (num < 0) {
            throw new Error('Supplied ufixed is negative');
        }

        return encodeSingle('uint256', num.mul(new BN(2).pow(new BN(size[1]))));
    } else if (type.startsWith('fixed')) {
        size = parseTypeNxM(type);

        return encodeSingle(
            'int256',
            parseNumber(arg).mul(new BN(2).pow(new BN(size[1]))),
        );
    }

    throw new Error('Unsupported or invalid type: ' + type);
};

export const methodData = (method: Record<string, any>, params: any[]) => {
    const methodSig =
        method.name + '(' + method.inputs.map((i: any) => i.type).join(',') + ')';
    const methodHash = keccak256s(methodSig).slice(0, 10);
    let encodedParams = params.map((param, i) =>
        encode(method.inputs[i].type, param),
    );
    var headBlock = '0x';
    let dataBlock = '0x';
    for (var i = 0; i < encodedParams.length; ++i) {
        if (encodedParams[i].dynamic) {
            var dataLoc = encodedParams.length * 32 + Bytes.length(dataBlock);
            headBlock = Bytes.concat(
                headBlock,
                Bytes.pad(32, natFromNumber(dataLoc)),
            );
            dataBlock = Bytes.concat(dataBlock, encodedParams[i].data);
        } else {
            headBlock = Bytes.concat(headBlock, encodedParams[i].data);
        }
    }
    return Bytes.flatten([methodHash, headBlock, dataBlock]);
};

export const parseEvent = (currentAbi: any[], eventObject: Record<string, any>) => {
    if (currentAbi.length === 0) {
        throw new Error('ABI is require for paser');
    }
    const filterEvents = filterEventFromAbi(currentAbi);
    const eventAbi = filterEvents.find(
        (item) => item.signature === eventObject.topics[0],
    );
    if (eventAbi) {
        const notIndexInputs = eventAbi.inputs.filter(
            (item: any) => item.indexed === false
        );
        const indexInputs = eventAbi.inputs.filter(
            (item: any) => item.indexed === true
        );
        const orderedInputs = [...notIndexInputs, ...indexInputs];
        const outputTypes = orderedInputs.map((item) => item.type);
        let outputBuffer = Buffer.from(eventObject.data.replace('0x', ''), 'hex');
        for (let i = 1; i < eventObject.topics.length; i++) {
            const indexedBuffer = Buffer.from(
                eventObject.topics[i].replace('0x', ''),
                'hex',
            );
            outputBuffer = Buffer.concat([outputBuffer, indexedBuffer]);
        }
        const decodeResult = abiJs.rawDecode(outputTypes, outputBuffer);
        const rawOutput = decodeResult.map((decode, index) => {
            if (outputTypes[index].startsWith('byte')) {
                return decode.toString('hex');
            }
            return decode.toString();
        });
        const decodeObject = decodeOutput(eventAbi.inputs, rawOutput);
        return {
            event: {
                name: eventAbi.name,
                ...decodeObject,
            },
            ...eventObject,
        };
    }
    return eventObject;
};

const filterEventFromAbi = (abi: any[]) => {
    const filteredAbi = abi.filter((item) => item.type === 'event');
    return filteredAbi.map((item) => ({
        signature: methodSignature(item),
        ...item,
    }));
};

const methodSignature = (method: Record<string, any>) => {
    const methodSig =
        method.name + '(' + method.inputs.map((i: any) => i.type).join(',') + ')';
    return keccak256s(methodSig);
};

export const encodeArray = (params: any[]) => params.map((param) => {
    if (isHexStrict(param)) {
        return param;
    } else {
        return toHex(param);
    }
});

// Parse N from type<N>
const parseTypeN = (type: string) => {
    const v = /^\D+(\d+)$/.exec(type);
    if (!v) throw new Error('Invalid type')
    return parseInt(v[1], 10)
};

// Is a type an array?
const isArray = (type: string) => type.lastIndexOf(']') === type.length - 1;

const isDynamic = (type: string) => {
    if (type === 'bytes' || type === 'string') return true;
    if (isArray(type)) return true;
    return false;
};

const encode = (type: string, value: any): { data: any, dynamic: boolean } => {
    if (type === 'uint256' || type === 'bytes32' || type === 'address') {
        return { data: Bytes.pad(32, value), dynamic: false };
    } else {
        return {
            data: encodeSingle(type, value),
            dynamic: isDynamic(type),
        };
    }
};

export const deployData = (bytecode: string, method: any, params: any[]) => {
    let headBlock = '0x';
    let dataBlock = '0x';
    if (params && method) {
        let encodedParams = params.map((param, i) =>
            encode(method.inputs[i].type, param),
        );
        for (let i = 0; i < encodedParams.length; ++i) {
            if (encodedParams[i].dynamic) {
                let dataLoc = encodedParams.length * 32 + Bytes.length(dataBlock);
                headBlock = Bytes.concat(
                    headBlock,
                    Bytes.pad(32, natFromNumber(dataLoc)),
                );
                dataBlock = Bytes.concat(dataBlock, encodedParams[i].data);
            } else {
                headBlock = Bytes.concat(headBlock, encodedParams[i].data);
            }
        }
    }
    return Bytes.flatten([bytecode, headBlock, dataBlock]);
};

export const findFunctionFromAbi = (abi: any[], type = 'function', name = '') => {
    if (type !== 'constructor') {
        return abi.find((item) => item.type === type && item.name === name)
        // return find(abi, (item) => item.type === type && item.name === name);
    }
    // return find(abi, (item) => item.type === type);
    return abi.find((item) => item.type === type)
};