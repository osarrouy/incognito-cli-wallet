import Number from '/lib/number'
import Tokens from '/lib/tokens'
import TX     from '/lib/transaction'
import UI     from '/lib/ui.js'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs
    .help()
    .version(false)
    .option('t', {
      alias       : 'token',
      demandOption: true,
      default     : 'PRV',
      describe    : 'The token you want to display the balance of',
      type        : 'string'
    })
    .argv
}

const handler = async (argv) => {
  try {
    const token   = Tokens.of(argv.token)
    const wallet  = await Wallet.load()
    const account = await UI.prompt.accounts(wallet)
    const history = await Wallet.history(account)
    const prettified = history.map(tx => TX.prettify(tx))
    console.log(prettified)
    UI.title('history')
    console.log(history)
    console.table(prettified)

    // UI.info(Number.toFormattedDecimals(balance, token.decimals) + ' ' + token.symbol);
  } catch (err) {
    UI.die(err.message || err)
  }
}

export const history = {
  command: 'history',
  desc   : 'Display history informations',
  builder,
  handler
}
