import numberToBN from 'number-to-bn';
import { numberToString, removeTrailingZeros } from './string';
import BN from 'bn.js';

// BN zero
const zero = new BN(0);
const negative1 = new BN(-1);

const unitMap = {
  hydro: '1',
  oxy: '1000000000',
  kai: '1000000000000000000',
};

const getValueOfUnit = (unitInput: string) => {
  const unit = unitInput ? unitInput.toLowerCase() : 'kai';
  const unitValue = (unitMap as any)[unit];

  if (typeof unitValue !== 'string') {
    throw new Error(
      `The unit provided ${unitInput} doesn't exists, please use the one of the following units ${JSON.stringify(
        unitMap,
        null,
        2
      )}`
    );
  }

  return new BN(unitValue, 10);
};

/**
 * Using for convert from hydro unit to OXY or KAI
 * @return value type: string
 *
 * @param input
 * @param unit
 *
 */
export const fromHydro = (input: any, unit: 'hydro' | 'oxy' | 'kai') => {
  try {
    let oxy = numberToBN(input);
    const negative = oxy.lt(zero);
    const base = getValueOfUnit(unit);
    const baseLength = (unitMap as any)[unit].length - 1 || 1;

    if (negative) {
      oxy = oxy.mul(negative1);
    }

    let fraction = oxy.mod(base).toString(10);

    while (fraction.length < baseLength) {
      fraction = `0${fraction}`;
    }

    const whole = oxy.div(base).toString(10);
    let value = `${whole}${fraction === '0' ? '' : `.${fraction}`}`;

    if (negative) {
      value = `-${value}`;
    }

    return removeTrailingZeros(value);
  } catch (error) {
    throw new Error(
      `While converting number ${input} to ${unit}, ${error.message}`
    );
  }
};

/**
 * Using for convert OXY or KAI unit to Hydro unit
 * @return value type: string
 *
 * @param input
 * @param unit
 */
export const toHydro = (input: any, unit: 'hydro' | 'oxy' | 'kai') => {
  try {
    let kai = numberToString(input);

    const base = getValueOfUnit(unit);
    const baseLength = (unitMap as any)[unit].length - 1 || 1;

    // Is it negative?
    const negative = kai.substring(0, 1) === '-';
    if (negative) {
      kai = kai.substring(1);
    }

    if (kai === '.') {
      throw new Error(
        `While converting number ${input} to hydro, invalid value`
      );
    }

    // Split it into a whole and fractional part
    const comps = kai.split('.');
    if (comps.length > 2) {
      throw new Error(
        `While converting number ${input} to hydro,  too many decimal points`
      );
    }

    let whole = comps[0],
      fraction = comps[1];

    if (!whole) {
      whole = '0';
    }
    if (!fraction) {
      fraction = '0';
    }
    if (fraction.length > baseLength) {
      throw new Error(
        `While converting number ${input} to hydro, too many decimal places`
      );
    }

    while (fraction.length < baseLength) {
      fraction += '0';
    }

    whole = new BN(whole);
    fraction = new BN(fraction);
    let hydro = whole.mul(base).add(fraction);

    if (negative) {
      hydro = hydro.mul(negative1);
    }

    return hydro.toString(10);
  } catch (error) {
    throw new Error(
      `While converting number ${input} to hydro, ${error.message}`
    );
  }
};
