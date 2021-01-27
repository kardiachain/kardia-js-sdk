import {
  checkAddressChecksum,
  isAddress,
  toChecksum,
} from '../../../src/util/account';

describe('Account modules testing utils function', () => {
  it('Test to check sum address', () => {
    const data = [
      {
        input: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881AA0',
        output: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881aa0',
      },
      {
        input: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881aa0',
        output: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881aa0',
      },
      {
        input: '0X5F75B3132ED7BE0C4A5007423C9A92F913881AA0',
        output: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881aa0',
      },
      {
        input: '0x5f75b3132ed7be0c4a5007423c9a92f913881aa0',
        output: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881aa0',
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const checkSumAddr = toChecksum(data[i].input);
      expect(checkSumAddr).toEqual(data[i].output);
    }
  });

  it('Test check address checksum', () => {
    const data = [
      {
        input: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881aa0',
        output: true,
      },
      {
        input: '0X5F75B3132ED7BE0C4A5007423C9A92F913881AA0',
        output: false,
      },
      {
        input: 'axxxxxxxxxxxxxxxxxxxxxxxx',
        output: false,
      },
      {
        input: '',
        output: false,
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const isCheckSum = checkAddressChecksum(data[i].input);
      expect(isCheckSum).toEqual(data[i].output);
    }
  });

  it('Test check is address format', () => {
    const data = [
      {
        input: '0x5f75B3132Ed7BE0C4a5007423C9a92f913881aa0',
        output: true,
      },
      {
        input: '0X5F75B3132ED7BE0C4A5007423C9A92F913881AA0',
        output: true,
      },
      {
        input: '5F75B3132ED7BE0C4A5007423C9A92F913881AA0',
        output: true,
      },
      {
        input: 'axxxxxxxxxxxxxxxxxxxxxxxx',
        output: false,
      },
      {
        input: '',
        output: false,
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const isAddr = isAddress(data[i].input);
      expect(isAddr).toEqual(data[i].output);
    }
  });
});
