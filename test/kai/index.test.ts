import KardiaClient, { KAIChain } from '../../src';
import {
  BLOCK_HASH,
  BLOCK_NUMBER,
  KAI_IN_HYDRO,
  NOT_VALIDATOR_ADDRESS,
  VALIDATOR_ADDRESS,
} from './config';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;

describe('KAI module test', () => {
  const kardiaClient = new KardiaClient({ endpoint });

  it('should be initialized with Kardia client', () => {
    expect(kardiaClient.kaiChain).toBeTruthy();
  });

  it('should get block number successfully', async () => {
    const blockNumber = await kardiaClient.kaiChain.getBlockNumber();
    expect(blockNumber).toBeTruthy();
  });

  it("should check current node's validator status", async () => {
    const isValidator = await kardiaClient.kaiChain.isValidator(
      VALIDATOR_ADDRESS
    );
    expect(typeof isValidator === 'boolean').toBeTruthy();
    expect(isValidator).toEqual(true);

    const notValidator = await kardiaClient.kaiChain.isValidator(
      NOT_VALIDATOR_ADDRESS
    );
    expect(typeof notValidator === 'boolean').toBeTruthy();
    expect(notValidator).toEqual(false);
  });

  it('should get validators list successfully', async () => {
    const validators = await kardiaClient.kaiChain.getValidators();
    expect(validators).toBeTruthy();
    expect(Array.isArray(validators)).toEqual(true);

    const validatorsWithDelegator = await kardiaClient.kaiChain.getValidators(
      true
    );
    expect(validatorsWithDelegator).toBeTruthy();
    expect(Array.isArray(validatorsWithDelegator)).toEqual(true);

    expect(validatorsWithDelegator[0]).toBeTruthy();
    expect(validatorsWithDelegator[0].delegators).toBeTruthy();
    expect(Array.isArray(validatorsWithDelegator[0].delegators)).toEqual(true);
  });

  it('should get block by block number successfully', async () => {
    const block = await kardiaClient.kaiChain.getBlockByBlockNumber(
      BLOCK_NUMBER
    );
    expect(block).toBeTruthy();
    expect(block.height).toEqual(BLOCK_NUMBER);

    expect(async () => {
      await kardiaClient.kaiChain.getBlockByBlockNumber(-1);
    }).rejects.toThrowError('Invalid block number');
  });

  it('should get block by hash successfully', async () => {
    const block = await kardiaClient.kaiChain.getBlockByHash(BLOCK_HASH);
    expect(block).toBeTruthy();
    expect(block.hash).toEqual(BLOCK_HASH);
  });

  it('should get block header by number successfully', async () => {
    const blockHeader = await kardiaClient.kaiChain.getBlockHeaderByBlockNumber(
      BLOCK_NUMBER
    );
    expect(blockHeader).toBeTruthy();
    expect(blockHeader.height).toEqual(BLOCK_NUMBER);

    expect(async () => {
      await kardiaClient.kaiChain.getBlockHeaderByBlockNumber(-1);
    }).rejects.toThrowError('Invalid block number');
  });

  it('should get block header by hash successfully', async () => {
    const blockHeader = await kardiaClient.kaiChain.getBlockHeaderByHash(
      BLOCK_HASH
    );
    expect(blockHeader).toBeTruthy();
    expect(blockHeader.hash).toEqual(BLOCK_HASH);
  });

  // Utility test
  it('should convert hydro to KAI correctly and vice versa', async () => {
    const kaiMount = KAIChain.KAIFromHydro(KAI_IN_HYDRO);
    expect(kaiMount).toEqual('1');

    const hydroAmount = KAIChain.HydroFromKAI('1');
    expect(hydroAmount).toEqual(KAI_IN_HYDRO);
  });
});
