import { fromHydro, toHydro } from '../../../src/util/amount';

describe('Amount modules testing ultis functions', () => {
  it('Convert from Hydro to KAI', () => {
    const data = [
      {
        input: '1000000000000000000',
        output: '1',
      },
      {
        input: '5500000000000000',
        output: '0.0055',
      },
      {
        input: '1',
        output: '0.000000000000000001',
      },
      {
        input: '5000000000000000000000000000',
        output: '5000000000',
      },
      {
        input: '4999999999999999999',
        output: '4.999999999999999999',
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const kai = fromHydro(data[i].input, 'kai');
      expect(kai).toEqual(data[i].output);
    }
  });

  it('Convert from Hydro to Oxy', () => {
    const data = [
      {
        input: '1000000000000000000',
        output: '1000000000',
      },
      {
        input: '5500000000000000',
        output: '5500000',
      },
      {
        input: '1',
        output: '0.000000001',
      },
      {
        input: '5000000000000000000000000000',
        output: '5000000000000000000',
      },
      {
        input: '4999999999999999999',
        output: '4999999999.999999999',
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const kai = fromHydro(data[i].input, 'oxy');
      expect(kai).toEqual(data[i].output);
    }
  });

  it('Convert Kai to Hydro', () => {
    const data = [
      {
        input: '1',
        output: '1000000000000000000',
      },
      {
        input: '0.0055',
        output: '5500000000000000',
      },
      {
        input: '0.000000000000000001',
        output: '1',
      },
      {
        input: '5000000000',
        output: '5000000000000000000000000000',
      },
      {
        input: '4.999999999999999999',
        output: '4999999999999999999',
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const kai = toHydro(data[i].input, 'kai');
      expect(kai).toEqual(data[i].output);
    }
  });

  it('Convert Oxy to Hydro', () => {
    const data = [
      {
        input: 1000000000,
        output: '1000000000000000000',
      },
      {
        input: '5500000',
        output: '5500000000000000',
      },
      {
        input: '0.000000001',
        output: '1',
      },
      {
        input: '5000000000000000000',
        output: '5000000000000000000000000000',
      },
      {
        input: '4999999999.999999999',
        output: '4999999999999999999',
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const kai = toHydro(data[i].input, 'oxy');
      expect(kai).toEqual(data[i].output);
    }
  });
});
