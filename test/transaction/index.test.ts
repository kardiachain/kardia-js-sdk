import KardiaClient from '../../src';
import { keccak256 } from '../../src/util/hash';
import { ADDRESS, ADDRESS_2 } from '../account/config';
import {ENDPOINT} from '../config'
import { TRANSACTION_HASH, PRIVATE_KEY } from './config';

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
        const txData = {
            from: ADDRESS,
            to: ADDRESS_2,
            gas: 1,
            nonce: 1,
            gasPrice: 1,
            value: 1,
            data: keccak256('123456')
        };
        const result = await kardiaClient.transaction.sendTransaction(txData, PRIVATE_KEY)
        expect(result).toBeTruthy()
    })
});
