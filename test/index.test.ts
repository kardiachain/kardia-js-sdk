import KardiaClient from '../src';
import { ENDPOINT } from './config';

describe('KardiaClient test', () => {
  it('should initialize new instance', () => {
    const kardiaClient = new KardiaClient({ endpoint: ENDPOINT });
    expect(kardiaClient).toBeTruthy();
  });
});
