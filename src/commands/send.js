import Number from '/lib/Number'
import Tokens from '/lib/tokens'
import UI     from '/lib/ui'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs.help().version(false)
}

const handler = async (argv) => {
  try {
    // const _token  = Tokens.of(argv.token)
    const wallet  = await Wallet.load()
    const account = await UI.prompt.accounts(wallet)
    const history = await account.nativeToken.transfer(
      [
        {
          paymentAddressStr: argv.address,
          amount           : Number.toFixed(argv.amount, Tokens.of('PRV').decimals),
          message          : ''
        }
      ],
      20 // fee in nano PRV
    )
    console.log(history)
  } catch (err) {
    UI.die(err.message)
  }
}

export const send = {
  command: 'send <address> <amount>',
  desc   : 'Send private coins',
  builder,
  handler
}
