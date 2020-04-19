import UI     from '/lib/ui'
import Wallet from '/lib/wallet'

const handler = async (argv) => {
  try {
    const wallet   = await Wallet.load(argv.password)
    const accounts = wallet.masterAccount.getAccounts()
    UI.columns(accounts.map(account => {
      return { name: account.name, address: account.key.keySet.paymentAddressKeySerialized }
    }))
  } catch (err) {
    UI.die(err.message || err)
  }
}

export const list = {
  command: 'list',
  desc   : 'Display all accounts',
  handler
}
