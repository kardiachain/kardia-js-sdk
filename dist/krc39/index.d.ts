import { Client } from '@open-rpc/client-js';
import KardiaContract from '../smc';
interface KRC39Props {
    client?: Client;
    provider?: string;
    address?: string;
}
declare class KRC39 {
    private _rpcClient;
    address: string;
    private _smcInstance;
    constructor({ client, address, provider }: KRC39Props);
    getContractInstance(): KardiaContract;
}
export default KRC39;
