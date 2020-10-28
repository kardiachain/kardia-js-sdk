import KardiaClient from '../src';
import { ENDPOINT, ENDPOINT_PUBLIC } from './config';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT

describe('KardiaClient test', () => {
  it('should initialize new instance', () => {
    const kardiaClient = new KardiaClient({ endpoint });
    expect(kardiaClient).toBeTruthy();
  });
});
