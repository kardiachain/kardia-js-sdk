import KardiaClient from '../../src';
import { keccak256 } from '../../src/util/hash';
import { ENDPOINT } from '../config';
import { ACCOUNT, ACCOUNT2 } from '../config/account';

describe('Transaction module test', () => {
  const kardiaClient = new KardiaClient({ endpoint: ENDPOINT });

  it('should be initialized with Kardia client', () => {
    expect(kardiaClient.transaction).toBeTruthy();
  });

  it('should send transaction successfully', async () => {
    const nonce = await kardiaClient.account.getNonce(ACCOUNT.address);
    const txData = {
      receiver: ACCOUNT2.address,
      gas: 50000,
      nonce,
      gasPrice: 1,
      amount: 1,
      data: keccak256('12345'),
    };

    // Use new sdk
    const txHash = await kardiaClient.transaction.sendTransaction(
      txData,
      ACCOUNT.privateKey
    );
    expect(txHash).toBeTruthy();
    
    const pendingTransactions = await kardiaClient.transaction.getPendingTransaction();
    expect(pendingTransactions).toBeTruthy();
    expect(Array.isArray(pendingTransactions)).toEqual(true);

    const txDetail = pendingTransactions.filter((tx: any) => tx.hash === txHash)
    expect(txDetail).toBeTruthy()

  });
});
