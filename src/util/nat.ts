const BN = require('bn.js');
const Bytes = require('./bytes');

const fromBN = (bn: any) => '0x' + bn.toString('hex');

const toBN = (str: string) => new BN(str.slice(2), 16);

const fromString = (str: string) => {
  const bn =
    '0x' +
    (str.slice(0, 2) === '0x'
      ? new BN(str.slice(2), 16)
      : new BN(str, 10)
    ).toString('hex');
  return bn === '0x0' ? '0x' : bn;
};

const toEther = (wei: string) =>
  toNumber(div(wei, fromString('10000000000'))) / 100000000;

const fromEther = (eth: number) =>
  mul(fromNumber(Math.floor(eth * 100000000)), fromString('10000000000'));

const toString = (a: string) => toBN(a).toString(10);

const fromNumber = (a: any) =>
  typeof a === 'string'
    ? /^0x/.test(a)
      ? a
      : '0x' + a
    : '0x' + new BN(a).toString('hex');

const toNumber = (a: any) => toBN(a).toNumber();

const toUint256 = (a: any) => Bytes.pad(32, a);

const bin = (method: string) => (a: string, b: string) =>
  fromBN(toBN(a)[method](toBN(b)));

const add = bin('add');
const mul = bin('mul');
const div = bin('div');
const sub = bin('sub');

export {
  toString,
  fromString,
  toNumber,
  fromNumber,
  toEther,
  fromEther,
  toUint256,
  add,
  mul,
  div,
  sub,
};
