import KardiaClient from '../../src';
import { keccak256 } from '../../src/util/hash';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';
import { ACCOUNT, ACCOUNT2 } from '../config/account';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;

describe('Transaction module test', () => {
  const kardiaClient = new KardiaClient({ endpoint });

  it('should be initialized with Kardia client', () => {
    expect(kardiaClient.transaction).toBeTruthy();
  });

  it('should send transaction successfully', async () => {
    const nonce = await kardiaClient.account.getNonce(ACCOUNT2.address);
    const txData = {
      receiver: ACCOUNT.address,
      gas: 50000,
      nonce,
      gasPrice: 1,
      amount: 22093,
      data: keccak256(Date.now().toString()),
    };

    const txHash = await kardiaClient.transaction.sendTransaction(
      txData,
      ACCOUNT2.privateKey
    );
    expect(txHash).toBeTruthy();

    const pendingTransactions = await kardiaClient.transaction.getPendingTransaction();
    expect(pendingTransactions).toBeTruthy();
    expect(Array.isArray(pendingTransactions)).toEqual(true);

    const txDetail = pendingTransactions.filter(
      (tx: any) => tx.hash === txHash
    );
    expect(txDetail).toBeTruthy();
  });
});
