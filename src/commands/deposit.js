import Tokens from '/lib/tokens'
import UI     from '/lib/ui.js'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs.help().version(false)
}

const handler = async (argv) => {
  try {
    const _token  = Tokens.of(argv.token)
    const wallet  = await Wallet.load()
    const account = await UI.prompt.accounts(wallet)
    const token   = await account.getFollowingPrivacyToken(_token.id)
    const address = await token.bridgeGenerateDepositAddress()
    UI.title('deposit address')
    UI.info(address)
    UI.title('qrcode')
    UI.qrcode(address)
  } catch (err) {
    UI.die(err.message)
  }
}

export const deposit = {
  command: 'deposit <token>',
  desc   : 'Display informations to deposit tokens',
  builder,
  handler
}
