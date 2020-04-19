import BigNumber from 'bignumber.js'
import Token     from './tokens'

const BN = (value) => {
  return new BigNumber(value)
}

const Number = {
  toDecimals: (value, decimals) => {
    const base = BN(10).exponentiatedBy(BN(decimals))
    return BN(value).dividedBy(base)
  },
  toFormattedDecimals: (value, token) => {
    const decimals = Token.decimals(token)
    const symbol   = Token.symbol(token)

    return Number.toDecimals(value, decimals).toFormat(4) + ' ' + symbol
  },
  toFixed: (value, decimals) => {
    const base = BN(10).exponentiatedBy(BN(decimals))
    return BN(value).multipliedBy(base).integerValue().toNumber()
  }
}

export default Number
