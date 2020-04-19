import UI     from '/lib/ui.js'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs.help().version(false)
}

const handler = async (argv) => {
  try {
    const wallet  = await Wallet.load()
    const account = await UI.prompt.accounts(wallet)

    UI.title('address')
    UI.info(account.key.keySet.paymentAddressKeySerialized)
    UI.title('qrcode')
    UI.qrcode(account.key.keySet.paymentAddressKeySerialized, { small: true })
  } catch (err) {
    UI.die(err.message)
  }
}

export const receive = {
  command: 'receive',
  desc   : 'Display informations to receive payments',
  builder,
  handler
}
