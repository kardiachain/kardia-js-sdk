import KardiaClient from '../../src';
import { BLOCK_NUMBER } from './config';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT

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
    const isValidator = await kardiaClient.kaiChain.isValidator();
    expect(typeof isValidator === 'boolean').toBeTruthy();
  });

  it('should get validators list successfully', async () => {
    const validators = await kardiaClient.kaiChain.getValidators();
    expect(validators).toBeTruthy();
    expect(Array.isArray(validators)).toEqual(true);
  });

  it('should get block by block number successfully', async () => {
    const block = await kardiaClient.kaiChain.getBlockByBlockNumber(
      BLOCK_NUMBER
    );
    expect(block).toBeTruthy();
    expect(block.height).toEqual(BLOCK_NUMBER);
  });

  // it('should get block by hash successfully', async () => {
  //   const block = await kardiaClient.kaiChain.getBlockByHash(BLOCK_HASH);
  //   expect(block).toBeTruthy();
  //   expect(block.hash).toEqual(BLOCK_HASH);
  // });

  it('should get block header by number successfully', async () => {
    const blockHeader = await kardiaClient.kaiChain.getBlockHeaderByBlockNumber(
      BLOCK_NUMBER
    );
    expect(blockHeader).toBeTruthy();
    expect(blockHeader.height).toEqual(BLOCK_NUMBER);
  });

  // it('should get block header by hash successfully', async () => {
  //   const blockHeader = await kardiaClient.kaiChain.getBlockHeaderByHash(BLOCK_HASH);
  //   expect(blockHeader).toBeTruthy();
  //   expect(blockHeader.hash).toEqual(BLOCK_HASH);
  // });

  it('should get basic block by number successfully', async () => {
    const basicBlock = await kardiaClient.kaiChain.getBasicBlockByNumber(
      BLOCK_NUMBER
    );
    expect(basicBlock).toBeTruthy();
    expect(basicBlock.height).toEqual(BLOCK_NUMBER);
  });

  // it('should get basic block by hash successfully', async () => {
  //   const basicBlock = await kardiaClient.kaiChain.getBasicBlockByHash(BLOCK_HASH);
  //   expect(basicBlock).toBeTruthy();
  //   expect(basicBlock.hash).toEqual(BLOCK_HASH);
  // });
});
