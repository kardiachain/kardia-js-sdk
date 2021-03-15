import { Client, RequestManager, HTTPTransport } from '@open-rpc/client-js';
import KardiaContract from '../smc';
import { checkAddressChecksum } from '../util/account';
import { krc20ABI } from './krc20.abi';
import { BigNumber } from 'bignumber.js';
import { toHydro } from '../util/amount';

interface KRC20Props {
  client?: Client;
  provider?: string;
  address?: string;
  name?: string;
  symbol?: string;
  decimals?: number;
}

class KRC20 {
  private _rpcClient: Client;
  public address: string = '';
  public name: string = '';
  public decimals: number = 18;
  public symbol: string = '';

  private _smcInstance: KardiaContract;

  constructor({
    client,
    address,
    name,
    decimals,
    symbol,
    provider,
  }: KRC20Props) {
    if (client) {
      this._rpcClient = client;
    } else if (provider) {
      const transport = new HTTPTransport(provider);
      this._rpcClient = new Client(new RequestManager([transport]));
    } else {
      throw new Error('Either [client] or [provider] must be provided');
    }

    this._smcInstance = new KardiaContract({ client: this._rpcClient });
    this._smcInstance.updateAbi(krc20ABI);

    if (address) {
      if (!checkAddressChecksum(address)) throw new Error('Invalid [address]');
      this.address = address;
    }
    if (name) {
      this.name = name;
    }
    if (symbol) {
      this.symbol = symbol;
    }
    if (decimals) {
      this.decimals = decimals;
    }
  }

  private validateAddress() {
    if (!checkAddressChecksum(this.address))
      throw new Error('Invalid [address]');
  }

  public getContractInstance() {
    return this._smcInstance;
  }

  public async getName(fetch?: boolean) {
    if (!fetch) return this.name;
    this.validateAddress();
    const name = await this._smcInstance
      .invokeContract('name', [])
      .call(this.address);
    if (name) {
      this.name = name;
    }
    return this.name;
  }

  public async getDecimals(fetch?: boolean) {
    if (!fetch) return this.decimals;
    this.validateAddress();
    const decimals = await this._smcInstance
      .invokeContract('decimals', [])
      .call(this.address);
    if (decimals) {
      this.decimals = decimals;
    }
    return this.decimals;
  }

  public async getSymbol(fetch?: boolean) {
    if (!fetch) return this.symbol;
    this.validateAddress();
    const symbol = await this._smcInstance
      .invokeContract('symbol', [])
      .call(this.address);
    if (symbol) {
      this.symbol = symbol;
    }
    return this.symbol;
  }

  public async getTotalSupply(
    format: 'string' | 'BigNumber' | 'number' = 'string'
  ) {
    this.validateAddress();
    const totalSupply = await this._smcInstance
      .invokeContract('totalSupply', [])
      .call(this.address);
    if (format === 'BigNumber') {
      return new BigNumber(totalSupply);
    }
    if (format === 'string') {
      return totalSupply.toLocaleString('fullwide', { useGrouping: false });
    }
    return totalSupply;
  }

  public async getFromAddress(address: string) {
    if (!checkAddressChecksum(address)) throw new Error('Invalid [address]');
    this.address = address;
    await this.getName(true);
    await this.getDecimals(true);
    await this.getSymbol(true);
  }

  public async balanceOf(address: string) {
    if (!checkAddressChecksum(address)) throw new Error('Invalid [address]');
    const balance = await this._smcInstance
      .invokeContract('balanceOf', [address])
      .call(this.address);
    return balance;
  }

  public async transfer(
    privateKey: string,
    to: string,
    amount: number,
    transferPayload: Record<string, any> = {}
  ) {
    this.validateAddress();
    if (!checkAddressChecksum(to)) throw new Error('Invalid [to]');
    if (amount < 0) throw new Error('Invalid [amount]');

    const invocation = this._smcInstance.invokeContract('transfer', [
      to,
      toHydro(amount, 'kai'),
    ]);

    if (!transferPayload.gas) {
      const defaultPayload = invocation.getDefaultTxPayload();
      const estimatedGas = await invocation.estimateGas(defaultPayload);

      transferPayload.gas = estimatedGas * 2;
    }

    return invocation.send(privateKey, this.address, transferPayload);
  }

  public async estimateGas(to: string, amount: number) {
    const invocation = this._smcInstance.invokeContract('transfer', [
      to,
      toHydro(amount, 'kai'),
    ]);

    const defaultPayload = invocation.getDefaultTxPayload();
    const estimatedGas = await invocation.estimateGas(defaultPayload);
    return estimatedGas * 2;
  }
}

export default KRC20;
