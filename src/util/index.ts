import {fromHydro, toHydro } from './amount'
import {
    toChecksum,
    checkAddressChecksum,
    isAddress,
    fromPrivate
} from './account'
import * as bytes from './bytes'

export const KardiaUtils = {
    fromHydro,
    toHydro,
    toChecksum,
    checkAddressChecksum,
    isAddress,
    fromPrivate,
    bytes
}