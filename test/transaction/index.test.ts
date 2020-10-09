import KardiaClient from '../../src';
import { keccak256 } from '../../src/util/hash';
import {ENDPOINT} from '../config'
import { ACCOUNT1, ACCOUNT2 } from '../config/account';
import { TRANSACTION_HASH } from './config';

describe('Transaction module test', () => {
    const kardiaClient = new KardiaClient({endpoint: ENDPOINT})

    it('should be initialized with Kardia client', () => {
        expect(kardiaClient.transaction).toBeTruthy();
    });

    it('should get pending transaction successfully', async () => {
        const pendingTransactions = await kardiaClient.transaction.getPendingTransaction()
        expect(pendingTransactions).toBeTruthy()
        expect(Array.isArray(pendingTransactions)).toEqual(true)
    })

    it('should get transaction detail successfully', async () => {
        const txDetail = await kardiaClient.transaction.getTransaction(TRANSACTION_HASH)
        expect(txDetail).toBeTruthy()
        expect(txDetail.hash).toBeTruthy()
        expect(txDetail.hash).toEqual(TRANSACTION_HASH)
    })

    it('should get transaction receipt successfully', async () => {
        const receipt = await kardiaClient.transaction.getTransactionReceipt(TRANSACTION_HASH)
        expect(receipt).toBeTruthy()
        expect(receipt.transactionHash).toBeTruthy()
        expect(receipt.transactionHash).toEqual(TRANSACTION_HASH)
    })

    it('should send transaction successfully', async () => {
        const nonce = await kardiaClient.account.getNonce(ACCOUNT1.address)
        const txData = {
            receiver: ACCOUNT2.address,
            gas: 21000,
            nonce,
            gasPrice: 1,
            amount: 4,
            data: keccak256('123456')
        };

        const result = await kardiaClient.transaction.sendTransaction(txData, ACCOUNT1.privateKey)
        expect(result).toBeTruthy()
    })
});
