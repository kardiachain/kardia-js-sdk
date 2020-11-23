import KardiaContract from '../../src/smc';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';
import { ACCOUNT } from '../config/account';
import { ABI, BYTECODES, DEFAULT_PARAM } from './config'

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;

describe('KAI module test', () => {
    let myContract: KardiaContract;

    beforeEach(() => {
        myContract = new KardiaContract({ provider: endpoint });
    })

    it('should be initialized successfullt', () => {
        expect(myContract).toBeTruthy();
    });

    it('should update ABI successfully', () => {
        myContract.updateAbi(ABI)
        expect(myContract.abi).toEqual(ABI)
    })

    it('should update bytecodes successfully', () => {
        myContract.updateByteCode(BYTECODES)
        expect(myContract.bytecodes).toEqual(BYTECODES)
    })

    it('should get info successfullt', () => {
        myContract.updateAbi(ABI)
        myContract.updateByteCode(BYTECODES)
        const info = myContract.info()

        expect(info).toBeTruthy()
        expect(info.abi).toBeTruthy()
        expect(info.byteCode).toBeTruthy()
    })

    it('should deploy contract and interact successfully', async () => {
        myContract.updateAbi(ABI)
        myContract.updateByteCode(BYTECODES)

        const preDeploy = myContract.deploy({
            params: [DEFAULT_PARAM]
        })

        expect(preDeploy).toBeTruthy()

        expect(preDeploy.txData).toBeTruthy()
        expect(preDeploy.txData()).toBeTruthy()

        expect(preDeploy.send).toBeTruthy()
        const smc = await preDeploy.send(ACCOUNT.privateKey)
        expect(smc).toBeTruthy()
        // expect(estimatedGas > 0).toEqual(true)

        // console.log(smcHash)

        const deployedContract = myContract.invokeContract('retrieve', [])
        const result = await deployedContract.call(smc.contractAddress, {}, "latest")

        // console.log(result)
        expect(result).toEqual(DEFAULT_PARAM)
    })
});