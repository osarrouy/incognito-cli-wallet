import Number from '/lib/number'
import Tokens from '/lib/tokens'
import UI     from '/lib/ui'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs
    .usage('$0 balance -a [account] -t [token]')
    .example("$0 balance -a 'Account 0' -t ETH")
    .version(false)
    .option('a', {
      alias   : 'account',
      describe: 'The account whose balance is to be displayed',
      type    : 'string'
    })
    .option('t', {
      alias       : 'token',
      demandOption: true,
      default     : 'PRV',
      describe    : 'The token whose balance is to be displayed',
      type        : 'string'
    })
    .argv
}

const handler = async (argv) => {
  try {
    const wallet  = await Wallet.load(argv.password)
    const account = await UI.prompt.accounts(wallet)
    const token   = await Tokens.of(account, argv.token)
    const balance = await token.getTotalBalance()

    UI.title('balance')
    UI.info(Number.toFormattedDecimals(balance, argv.token))
  } catch (err) {
    UI.die(err.message || err)
  }
}

export const balance = {
  command: 'balance',
  desc   : 'Display balance',
  builder,
  handler
}
