import KardiaContract from '../../src/smc';
import { sleep } from '../../src/util/time';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';
import { ACCOUNT2 } from '../config/account';
import { ABI, BYTECODES, DEFAULT_PARAM } from './config';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;

describe('KAI module test', () => {
  let myContract: KardiaContract;
  beforeEach(() => {
    myContract = new KardiaContract({ provider: endpoint });
  });

  it('should be initialized successfullt', () => {
    expect(myContract).toBeTruthy();
  });

  it('should update ABI successfully', () => {
    myContract.updateAbi(ABI);
    expect(myContract.abi).toEqual(ABI);
  });

  it('should update bytecodes successfully', () => {
    myContract.updateByteCode(BYTECODES);
    expect(myContract.bytecodes).toEqual(BYTECODES);
  });

  it('should get info successfullt', () => {
    myContract.updateAbi(ABI);
    myContract.updateByteCode(BYTECODES);
    const info = myContract.info();

    expect(info).toBeTruthy();
    expect(info.abi).toBeTruthy();
    expect(info.byteCode).toBeTruthy();
  });

  it('should deploy contract and interact successfully', async () => {
    jest.setTimeout(50000);
    sleep(10000);
    myContract.updateAbi(ABI);
    myContract.updateByteCode(BYTECODES);

    const preDeploy = myContract.deploy({
      params: [DEFAULT_PARAM],
    });

    expect(preDeploy).toBeTruthy();

    expect(preDeploy.txData).toBeTruthy();
    expect(preDeploy.txData()).toBeTruthy();

    expect(preDeploy.send).toBeTruthy();
    const smcData = await preDeploy.send(ACCOUNT2.privateKey);
    expect(smcData).toBeTruthy();

    const deployedContract = myContract.invokeContract('retrieve', []);
    const result = await deployedContract.call(
      smcData.contractAddress,
      {},
      'latest'
    );

    expect(result).toEqual(DEFAULT_PARAM);
  });
});
