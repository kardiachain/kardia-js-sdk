interface KardiaConnectProps {
    address: string;
    signature: string;
    schema: string;
}
interface KardiaConnectTxProps {
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    data?: string;
}
/**
 * Module to work with KardiaConnect (in development)
 */
declare class KardiaConnect {
    address: string;
    private _signature;
    private _schema;
    constructor(props: KardiaConnectProps);
    static getAuthorizeURL(appName: string, callbackSchema: string, callbackPath: string): string;
    requestSignTxURL(txMeta: KardiaConnectTxProps, callbackPath: string): string;
}
export default KardiaConnect;
