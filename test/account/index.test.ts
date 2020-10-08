import KardiaClient from '../../src';
import {ENDPOINT} from '../config'
import { ADDRESS, BLOCK_HASH, BLOCK_HEIGHT } from './config';

describe('Account module test', () => {
    const kardiaClient = new KardiaClient({endpoint: ENDPOINT})

    it('should be initialized with Kardia client', () => {
        expect(kardiaClient.account).toBeTruthy();
    });
    
    it('should get balance successfully', async () => {
        const balance = await kardiaClient.account.getBalance(ADDRESS)
        expect(balance).toBeTruthy()
    });

    it('should get balance with block hash successfully', async () => {
        const balance = await kardiaClient.account.getBalance(ADDRESS, {
            blockHash: BLOCK_HASH
        })
        expect(balance).toBeTruthy()
    });

    it('should get balance with block height successfully', async () => {
        const balance = await kardiaClient.account.getBalance(ADDRESS, {
            blockHeight: BLOCK_HEIGHT
        })
        expect(balance).toBeTruthy()
    });

    it('should get nonce successfully', async () => {
        const nonce = await kardiaClient.account.getNonce(ADDRESS)
        expect(nonce).toBeTruthy()
    });
});
