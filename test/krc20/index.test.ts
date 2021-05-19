import KardiaClient from '../../src';
import KRC20 from '../../src/krc20';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';
import { ACCOUNT1, ACCOUNT2, TOKEN1 } from './config';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;
const kardiaClient = new KardiaClient({ endpoint });

describe('KRC20 module test', () => {
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

  it('should get name successfully', async () => {
    const name = await krc20Instance.getName(true);
    expect(name).toEqual(TOKEN1.name);
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
  });

  it('should get balance successfully', async () => {
    const balance = await krc20Instance.balanceOf(ACCOUNT1.address);
    expect(balance).toBeTruthy();
  });

  it('should transfer successfully', async () => {
    jest.setTimeout(150000);

    const tx = await krc20Instance.transfer(
      ACCOUNT1.privateKey,
      ACCOUNT2.address,
      1,
      {},
      true
    );
    expect(tx).toBeTruthy();
    expect(tx.from).toEqual(ACCOUNT1.address);
    expect(tx.to).toEqual(TOKEN1.address);
  });

  it('should transfer raw successfully', async () => {
    jest.setTimeout(150000);

    const tx = await krc20Instance.transferRaw(
      ACCOUNT1.privateKey,
      ACCOUNT2.address,
      '1000000000000000000',
      {},
      true
    );
    expect(tx).toBeTruthy();
    expect(tx.from).toEqual(ACCOUNT1.address);
    expect(tx.to).toEqual(TOKEN1.address);
  });

  it('should return tx hash when transfer without `waitUntilMined` flag', async () => {
    jest.setTimeout(150000);

    const tx = await krc20Instance.transferRaw(
      ACCOUNT1.privateKey,
      ACCOUNT2.address,
      '1000000000000000000',
    );
    expect(tx).toBeTruthy();
    expect(typeof tx === 'string').toBeTruthy()
  })
});
