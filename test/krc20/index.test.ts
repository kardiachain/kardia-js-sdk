import KardiaClient from '../../src';
import { BigNumber } from 'bignumber.js';
import KRC20 from '../../src/krc20';
import KardiaContract from '../../src/smc';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';
import {
  ACCOUNT1,
  ACCOUNT2,
  ADDRESS_LOWERCASE,
  TOKEN1,
  TOKEN2,
} from './config';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;
const kardiaClient = new KardiaClient({ endpoint });

describe('SMC module test', () => {
  let krc20Instance: KRC20;
  beforeEach(() => {
    krc20Instance = new KRC20({ provider: endpoint, address: TOKEN1.address });
  });

  it('should be initialized with Kardia client', async () => {
    expect(kardiaClient.krc20).toBeTruthy();
  });

  it('should be initialized successfully', () => {
    expect(krc20Instance).toBeTruthy();
  });

  it('should throw error when initialized without client and provider', () => {
    expect(() => {
      new KRC20({});
    }).toThrowError('Either [client] or [provider] must be provided');
  });

  it('should throw error when initialized with invalid address', async () => {
    expect(() => {
      new KRC20({ provider: endpoint, address: 'invalid' });
    }).toThrowError('Invalid [address]');
  });

  it('should get name successfully', async () => {
    const name = await krc20Instance.getName(true);
    expect(name).toEqual(TOKEN1.name);
  });

  it('should throw error when get name of invalid token address', async () => {
    expect(async () => {
      krc20Instance.address = 'invalid_address';
      await krc20Instance.getName(true);
    }).rejects.toThrowError('Invalid [address]');
  });

  it('should get decimals successfully', async () => {
    const decimals = await krc20Instance.getDecimals(true);
    expect(decimals).toEqual(TOKEN1.decimals);
  });

  it('should get symbol successfully', async () => {
    const symbol = await krc20Instance.getSymbol(true);
    expect(symbol).toEqual(TOKEN1.symbol);
  });

  it('should get total supply successfully', async () => {
    const totalSupply = await krc20Instance.getTotalSupply();
    expect(totalSupply).toEqual(TOKEN1.totalSupply);

    const totalSupplyNumber = await krc20Instance.getTotalSupply('number');
    expect(totalSupplyNumber).toEqual(Number(TOKEN1.totalSupply));

    const totalSupplyBN = await krc20Instance.getTotalSupply('BigNumber');
    expect(totalSupplyBN).toBeInstanceOf(BigNumber);
  });

  it('should get balance successfully', async () => {
    const balance = await krc20Instance.balanceOf(ACCOUNT1.address);
    expect(balance).toBeTruthy();
  });

  it('should throw error when get balance of invalid address', async () => {
    expect(async () => {
      await krc20Instance.balanceOf('invalid');
    }).rejects.toThrowError('Invalid [address]');
  });

  it('should transfer successfully', async () => {
    jest.setTimeout(150000);

    const tx = await krc20Instance.transfer(
      ACCOUNT1.privateKey,
      ACCOUNT2.address,
      1
    );
    expect(tx).toBeTruthy();
    expect(tx.from).toEqual(ACCOUNT1.address);
    expect(tx.to).toEqual(TOKEN1.address);
  });

  it('should throw error when transfer with amount less than 0', () => {
    expect(async () => {
      await krc20Instance.transfer(ACCOUNT1.privateKey, ACCOUNT2.address, -1);
    }).rejects.toThrowError('Invalid [amount]');
  });

  it('should throw error when transfer with invalid address', () => {
    expect(async () => {
      await krc20Instance.transfer(ACCOUNT1.privateKey, ADDRESS_LOWERCASE, 1);
    }).rejects.toThrowError('Invalid [to]');
  });

  it('should initialized with name, symbol, decimals, abi', async () => {
    const NAME = 'NAME';
    const DECIMALS = 12;
    const SYMBOL = 'SYMBOL';
    const ABI: Record<string, any>[] = [];
    const internalInstance = new KRC20({
      provider: endpoint,
      address: TOKEN1.address,
      name: NAME,
      decimals: DECIMALS,
      symbol: SYMBOL,
      abi: ABI,
    });
    expect(await internalInstance.getName()).toEqual(NAME);
    expect(await internalInstance.getDecimals()).toEqual(DECIMALS);
    expect(await internalInstance.getSymbol()).toEqual(SYMBOL);
    expect(internalInstance.abi).toEqual(ABI);
  });

  it('should get contract instance', async () => {
    const smcInstance = krc20Instance.getContractInstance();
    expect(smcInstance).toBeInstanceOf(KardiaContract);
  });

  it('should get from address successfully', async () => {
    expect(async () => {
      await krc20Instance.getFromAddress('invalid address');
    }).rejects.toThrowError('Invalid [address]');

    await krc20Instance.getFromAddress(TOKEN2.address);
    expect(await krc20Instance.getName()).toEqual(TOKEN2.name);
    expect(await krc20Instance.getDecimals()).toEqual(TOKEN2.decimals);
    expect(await krc20Instance.getSymbol()).toEqual(TOKEN2.symbol);
  });

  it('should estimate gas successfully', async () => {
    const estimatedGas = await krc20Instance.estimateGas(ACCOUNT2.address, 100);
    expect(estimatedGas).toBeTruthy();
  });
});
