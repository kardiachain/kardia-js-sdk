import KardiaClient from '../../src';
import { BLOCK_HASH, BLOCK_NUMBER } from './config';
import { ENDPOINT } from '../config';

describe('KAI module test', () => {
  const kardiaClient = new KardiaClient({ endpoint: ENDPOINT });

  it('should be initialized with Kardia client', () => {
    expect(kardiaClient.KAI).toBeTruthy();
  });

  it('should get block number successfully', async () => {
    const blockNumber = await kardiaClient.KAI.getBlockNumber();
    expect(blockNumber).toBeTruthy();
  });

  it("should check current node's validator status", async () => {
    const isValidator = await kardiaClient.KAI.isValidator();
    expect(typeof isValidator === 'boolean').toBeTruthy();
  });

  it('should get validators list successfully', async () => {
    const validators = await kardiaClient.KAI.getValidators();
    expect(validators).toBeTruthy();
    expect(Array.isArray(validators)).toEqual(true);
  });

  it('should get block by block number successfully', async () => {
    const block = await kardiaClient.KAI.getBlockByBlockNumber(BLOCK_NUMBER);
    expect(block).toBeTruthy();
    expect(block.height).toEqual(BLOCK_NUMBER);
  });

  it('should get block by hash successfully', async () => {
    const block = await kardiaClient.KAI.getBlockByHash(BLOCK_HASH);
    expect(block).toBeTruthy();
    expect(block.hash).toEqual(BLOCK_HASH);
  });

  it('should get block header by number successfully', async () => {
    const blockHeader = await kardiaClient.KAI.getBlockHeaderByBlockNumber(
      BLOCK_NUMBER
    );
    expect(blockHeader).toBeTruthy();
    expect(blockHeader.height).toEqual(BLOCK_NUMBER);
  });

  it('should get block header by hash successfully', async () => {
    const blockHeader = await kardiaClient.KAI.getBlockHeaderByHash(BLOCK_HASH);
    expect(blockHeader).toBeTruthy();
    expect(blockHeader.hash).toEqual(BLOCK_HASH);
  });

  it('should get basic block by number successfully', async () => {
    const basicBlock = await kardiaClient.KAI.getBasicBlockByNumber(
      BLOCK_NUMBER
    );
    expect(basicBlock).toBeTruthy();
    expect(basicBlock.height).toEqual(BLOCK_NUMBER);
  });

  it('should get basic block by hash successfully', async () => {
    const basicBlock = await kardiaClient.KAI.getBasicBlockByHash(BLOCK_HASH);
    expect(basicBlock).toBeTruthy();
    expect(basicBlock.hash).toEqual(BLOCK_HASH);
  });
});
