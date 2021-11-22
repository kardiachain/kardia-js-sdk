import Web3 from "web3"
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from "../transaction/config"

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
  data?: string
}

const APP_PREFIX = 'kardiachainwallet://'

const getApproveMessage = (callbackSchema: string) => {
  return `approve|${callbackSchema}`
}

const getAddressFromSignature = (signature: string, schema: string) => {
  const web3 = new Web3()
  return web3.eth.accounts.recover(getApproveMessage(schema), signature)
}

const verifySignature = (signature: string, schema: string, walletAddress: string) => {
  return getAddressFromSignature(signature, schema).toLowerCase() === walletAddress.toLowerCase()
}

/**
 * Module to work with KardiaConnect (in development)
 */
class KardiaConnect {
  public address = ''
  private _signature = ''
  private _schema = ''

  constructor(props: KardiaConnectProps) {

    if (!props.schema) {
      throw new Error('[schema] must be provided');
    }

    if (!props.address) {
      throw new Error('[address] must be provided');
    }

    if (!props.signature) {
      throw new Error('[signature] must be provided');
    }

    if (!verifySignature(props.signature, props.schema, props.address)) {
      throw new Error('Invalid signature');
    }

    this.address = props.address
    this._signature = props.signature
    this._schema = props.schema

  }

  public static getAuthorizeURL(appName: string, callbackSchema: string, callbackPath: string) {
    return `${APP_PREFIX}authorize/${appName}/${callbackSchema}/${callbackPath}`
  }

  public requestSignTxURL(txMeta: KardiaConnectTxProps, callbackPath: string) {
    const parsedTxMeta = `${txMeta.from}|${txMeta.to}|${txMeta.value}|${txMeta.gas || DEFAULT_GAS}|${txMeta.gasPrice || DEFAULT_GAS_PRICE}|${txMeta.data || ''}`
    return `${APP_PREFIX}signTx/${this._signature}/${parsedTxMeta}/${this._schema}/${callbackPath}`
  }
}

export default KardiaConnect;