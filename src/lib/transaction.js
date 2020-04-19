import Number from '/lib/number'

const Transaction = {
  prettify: (tx) => {
    const { CONSTANT } = require('incognito-js/build/node')

    console.log(CONSTANT.TX_CONSTANT.TX_TYPE)
    return {
      id     : tx.txId,
      type   : Transaction.type(tx),
      status : Transaction.status(tx),
      amount : Number.toFormattedDecimals(tx.nativeTokenInfo.amount, 9),
      fee    : tx.nativeTokenInfo.fee + ' nano PRV',
      to     : tx.nativeTokenInfo.paymentInfoList[0].paymentAddressStr,
      message: tx.nativeTokenInfo.paymentInfoList[0].message

    }
  },
  type: (_tx) => {
    const { CONSTANT } = require('incognito-js/build/node')

    for (const [key, value] of Object.entries(CONSTANT.TX_CONSTANT.TX_TYPE)) {
      if (value === _tx.txType) return key
    }
    return 'UNKNOWN'
  },
  status: (_tx) => {
    const { CONSTANT } = require('incognito-js/build/node')

    for (const [key, value] of Object.entries(CONSTANT.TX_CONSTANT.TX_STATUS)) {
      if (value === _tx.status) return key
    }
    return 'UNKNOWN'
  }
}

export default Transaction
