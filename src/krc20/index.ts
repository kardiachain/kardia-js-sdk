import { Client, RequestManager, HTTPTransport } from '@open-rpc/client-js';
import KardiaContract from '../smc';
import { checkAddressChecksum } from '../util/account';
import { krc20ABI } from './krc20.abi';
import { BigNumber } from 'bignumber.js';
import { getVersion } from '../util/helper';
// import { toHydro } from '../util/amount';

interface KRC20Props {
  client?: Client;
  provider?: string;
  address?: string;
  name?: string;
  symbol?: string;
  decimals?: number;
  abi?: Record<string, any>[];
}

class KRC20 {
  private _rpcClient: Client;
  public address: string = '';
  public name: string = '';
  public decimals: number = 18;
  public symbol: string = '';
  public abi: Record<string, any>[] = krc20ABI;

  private _smcInstance: KardiaContract;

  constructor({
    client,
    address,
    name,
    decimals,
    symbol,
    provider,
    abi,
  }: KRC20Props) {
    if (client) {
      this._rpcClient = client;
    } else if (provider) {
      const transport = new HTTPTransport(provider, {
        headers: {
          "User-Agent": `JS SDK / ${getVersion()}`
        }
      });
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
    if (abi) {
      this.abi = abi;
    }
  }

  public setCustomABI(abi: Record<string, any>[]) {
    this.abi = abi;
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
    if (decimals !== undefined) {
      this.decimals = decimals;
    }
    return Number(this.decimals);
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
      return (new BigNumber(totalSupply)).toFixed();
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

  public async transferRaw(
    privateKey: string,
    to: string,
    amount: string,
    transferPayload: Record<string, any> = {},
    waitUntilMined = false
  ) {
    this.validateAddress();
    if (!checkAddressChecksum(to)) throw new Error('Invalid [to]');
    if (!amount) throw new Error('Invalid [amount]');

    const invocation = this._smcInstance.invokeContract('transfer', [
      to,
      amount,
    ]);

    if (!transferPayload.gas) {
      const defaultPayload = invocation.getDefaultTxPayload();
      const estimatedGas = await invocation.estimateGas(defaultPayload);

      transferPayload.gas = estimatedGas * 2;
    }

    return invocation.send(privateKey, this.address, transferPayload, waitUntilMined);
  }

  public async transfer(
    privateKey: string,
    to: string,
    amount: number | string,
    transferPayload: Record<string, any> = {},
    waitUntilMined = false
  ) {
    this.validateAddress();
    if (!checkAddressChecksum(to)) throw new Error('Invalid [to]');
    const bnAmount = new BigNumber(amount);

    if (bnAmount.isLessThan(new BigNumber(0))) throw new Error('Invalid [amount]');
    
    const bnDecimals = new BigNumber(10 ** this.decimals)

    const invocation = this._smcInstance.invokeContract('transfer', [
      to,
      bnAmount.multipliedBy(bnDecimals).toFixed(0, 1)
    ]);

    if (!transferPayload.gas) {
      const defaultPayload = invocation.getDefaultTxPayload();
      const estimatedGas = await invocation.estimateGas(defaultPayload);

      transferPayload.gas = estimatedGas * 2;
    }

    return invocation.send(privateKey, this.address, transferPayload, waitUntilMined);
  }

  public async estimateGas(to: string, amount: number) {
    const bnAmount = new BigNumber(amount);
    const bnDecimals = new BigNumber(10 ** this.decimals)
  
    const invocation = this._smcInstance.invokeContract('transfer', [
      to,
      bnAmount.multipliedBy(bnDecimals).toFixed(0, 1)
    ]);

    const defaultPayload = invocation.getDefaultTxPayload();
    const estimatedGas = await invocation.estimateGas(defaultPayload);
    return estimatedGas * 2;
  }
}

export default KRC20;
