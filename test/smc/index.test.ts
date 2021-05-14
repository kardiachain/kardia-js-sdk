import KardiaContract from '../../src/smc';
import {KardiaContract as ESMKardiaContract} from '../../src'
// import { DEFAULT_GAS_PRICE } from '../../src/transaction/config';
import { sleep } from '../../src/util/time';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';
import {
  DEPLOY_ACCOUNT,
  SMC1,
  // SMC2,
  // SMC3,
  SMC4,
  TX_TO_GET_EVENTS,
} from './config';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;

describe('SMC module test', () => {
  let myContract: KardiaContract;
  beforeEach(() => {
    myContract = new KardiaContract({ provider: endpoint });
  });

  it('should be initialized successfully', () => {
    expect(myContract).toBeTruthy();
  });

  it('should be initialized by using ESM module', () => {
    const esmContractInstance = new ESMKardiaContract({ provider: endpoint })
    expect(esmContractInstance).toBeTruthy()
  })

  it('should throw error when initialized without client and provider', () => {
    expect(() => {
      new KardiaContract({});
    }).toThrowError('Either [client] or [provider] must be provided');
  });

  it('should throw error when initialized with invalid ABI', () => {
    expect(() => {
      // @ts-ignore
      new KardiaContract({ provider: endpoint, abi: 'abc' });
    }).toThrowError('Invalid [abi]');
  });

  it('should update ABI successfully', () => {
    myContract.updateAbi(SMC1.ABI);
    expect(myContract.abi).toEqual(SMC1.ABI);
  });

  it('should update bytecodes successfully', () => {
    myContract.updateByteCode(SMC1.BYTECODES);
    expect(myContract.bytecodes).toEqual(SMC1.BYTECODES);
  });

  it('should get info successfullt', () => {
    myContract.updateAbi(SMC1.ABI);
    myContract.updateByteCode(SMC1.BYTECODES);
    const info = myContract.info();

    expect(info).toBeTruthy();
    expect(info.abi).toBeTruthy();
    expect(info.byteCode).toBeTruthy();
  });

  it('should parse event successfully', async () => {
    const txHashToGetEvent = TX_TO_GET_EVENTS;
    myContract.updateAbi(SMC4.ABI);
    const events = await myContract.parseEvent(txHashToGetEvent);
    expect(Array.isArray(events)).toEqual(true);
    expect(events.length).toEqual(1);
  });

  it('should deploy contract and interact successfully', async () => {
    jest.setTimeout(150000);

    // const SMC_TO_TEST = [SMC1, SMC2, SMC3];
    // const SMC_TO_TEST = [SMC3];
    const SMC_TO_TEST = [SMC1];
    for (let index = 0; index < SMC_TO_TEST.length; index++) {
      sleep(50000);
      const smc = SMC_TO_TEST[index];
      myContract.updateAbi(smc.ABI);
      myContract.updateByteCode(smc.BYTECODES);

      const preDeploy = myContract.deploy({
        params: smc.DEFAULT_PARAM,
      });

      expect(preDeploy).toBeTruthy();

      expect(preDeploy.txData).toBeTruthy();
      expect(preDeploy.txData()).toBeTruthy();

      expect(preDeploy.send).toBeTruthy();

      const defaultPayload = preDeploy.getDefaultTxPayload();
      const estimatedGas = await preDeploy.estimateGas(defaultPayload);
      expect(estimatedGas).toBeTruthy();
      const smcData = await preDeploy.send(DEPLOY_ACCOUNT.privateKey, {
        gas: estimatedGas * 2,
      }, true);
      expect(smcData).toBeTruthy();

      const deployedContract = myContract.invokeContract(
        smc.FUNCTION_TO_TEST.name,
        smc.FUNCTION_TO_TEST.param
      );

      const defaultInvokePayload = deployedContract.getDefaultTxPayload();
      const estimatedGasForInvoke = await deployedContract.estimateGas(
        defaultInvokePayload
      );
      expect(estimatedGasForInvoke).toBeTruthy();

      const result = await deployedContract.call(
        smcData.contractAddress,
        {
          gas: estimatedGasForInvoke * 2,
        },
        'latest'
      );

      expect(result).toEqual(smc.EXPECTED_RESULT);
    }
  });
});
