import KardiaClient from '../../src';
import { ENDPOINT } from '../config';
import { ACCOUNT, ACCOUNT2 } from '../config/account';
import { BLOCK_HEIGHT } from './config';

describe('Account module test', () => {
  const kardiaClient = new KardiaClient({ endpoint: ENDPOINT });

  it('should be initialized with Kardia client', () => {
    expect(kardiaClient.account).toBeTruthy();
  });

  it('should get balance successfully', async () => {
    const balance = await kardiaClient.account.getBalance(ACCOUNT.address);
    expect(balance).toBeTruthy();
  });

  // it('should get balance with block hash successfully', async () => {
  //   const balance = await kardiaClient.account.getBalance(ACCOUNT.address, {
  //     blockHash: BLOCK_HASH,
  //   });
  //   expect(balance).toBeTruthy();
  // });

  it('should get balance with block height successfully', async () => {
    const balance = await kardiaClient.account.getBalance(ACCOUNT.address, {
      blockHeight: BLOCK_HEIGHT,
    });
    expect(balance).toBeTruthy();
  });

  it('should get nonce successfully', async () => {
    const nonce = await kardiaClient.account.getNonce(ACCOUNT2.address);
    expect(nonce).toBeTruthy();
  });
});
