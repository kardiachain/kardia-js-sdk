import { Client } from "@open-rpc/client-js"
import {decodeSignature, makeEven, sign, trimLeadingZero} from '../util/account';
import { fromNat } from '../util/bytes';
// import {keccak256} from 'js-sha3';
import { keccak256 } from '../util/hash'
import { decode, encode } from '../util/rlp';
import { isHexStrict, toHex } from '../util/string';

interface KardiaTransactionProps {
    client: Client
}

class KardiaTransaction {
    private _rpcClient: Client
    constructor({client}: KardiaTransactionProps) {
        this._rpcClient = client;
    }

    public async getTransaction(txHash: string) {
        return await this._rpcClient.request({
            method: 'tx_getTransaction',
            params: [txHash]
        })
    }

    public async getPendingTransaction() {
        return await this._rpcClient.request({
            method: 'tx_pendingTransactions',
            params: []
        })
    }

    public async getTransactionReceipt(txHash: string) {
        return await this._rpcClient.request({
            method: 'tx_getTransactionReceipt',
            params: [txHash]
        })
    }

    private async signTransaction(tx: any, privateKey: string) {
        // const account = fromPrivate(privateKey);
        if (!tx.gas) {
            throw new Error('"gas" is missing');
        }
    
        if (tx.nonce < 0 || tx.gas < 0 || tx.gasPrice < 0) {
            throw new Error('Gas, gasPrice, nonce is lower than 0');
        }
    
        const transaction = {
            nonce: tx.nonce,
            gasPrice: tx.gasPrice,
            gas: tx.gas,
            to: '0x' + tx.to.toLowerCase().replace('0x', ''),
            value: tx.value,
            data: '0x' + tx.data.toLowerCase().replace('0x', '')
        };
    
        const rlpEncoded = encode([
            fromNat(transaction.nonce),
            fromNat(transaction.gasPrice),
            fromNat(transaction.gas),
            transaction.to.toLowerCase(),
            fromNat(transaction.value),
            transaction.data
        ]);
        const hash = keccak256(rlpEncoded);
        const signature = sign(hash, privateKey);
        const decodeSign = decodeSignature(signature);
    
        const rawTx = decode(rlpEncoded).concat(decodeSign);
        rawTx[6] = makeEven(trimLeadingZero(decodeSign[0]));
        rawTx[7] = makeEven(trimLeadingZero(decodeSign[1]));
        rawTx[8] = makeEven(trimLeadingZero(decodeSign[2]));
    
        const rawTransaction = encode(rawTx);
    
        const values = decode(rawTransaction);
        const result = {
            messageHash: hash,
            v: trimLeadingZero(values[6].toString()),
            r: trimLeadingZero(values[7].toString()),
            s: trimLeadingZero(values[8].toString()),
            rawTransaction: rawTransaction
        };
        return result;
    }

    private async generateTransaction({
        receiver = '0x',
        amount = '0xff',
        nonce = '0x0',
        gasPrice = '0xff',
        gas = '0xff',
        data = '0x'
    }) {
        return {
            nonce: isHexStrict(nonce) ? nonce : toHex(nonce),
            to: receiver,
            gasPrice: isHexStrict(gasPrice) ? gasPrice : toHex(gasPrice),
            gas: isHexStrict(gas) ? gas : toHex(gas),
            value: isHexStrict(amount) ? amount : toHex(amount),
            data: '0x' + data.toLowerCase().replace(/^0x/i, '')
        }
    };

    public async sendTransaction(data: any, privateKey: string) {
        const generatedTx = await this.generateTransaction(data)
        const signedTx = await this.signTransaction(generatedTx, privateKey)
        return await this._rpcClient.request({
            method: 'tx_sendRawTransaction',
            params: [signedTx.rawTransaction]
        })
    }
}

export default KardiaTransaction