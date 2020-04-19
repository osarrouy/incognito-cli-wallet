import UI     from '/lib/ui'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs
    .usage('$0 account create <name> [options]')
    .positional('<name>', {
      describe: 'Name of the account to be created',
      type    : 'string'
    })
    .option('s', {
      alias   : 'shard',
      describe: 'Shard id of the account to be created',
      type    : 'number'
    })
    .argv
}

const handler = async (argv) => {
  try {
    const wallet  = await Wallet.load(argv.password, { wasm: true })
    const account = await wallet.masterAccount.addAccount(argv.name, argv.shard)
    await Wallet.save(wallet)
    UI.success('Account successfully created')
    UI.title('payment address')
    UI.info(account.key.keySet.paymentAddressKeySerialized)
  } catch (err) {
    UI.die(err.message || err)
  }
}

export const create = {
  command: 'create <name>',
  desc   : 'Create a new account',
  builder,
  handler
}
