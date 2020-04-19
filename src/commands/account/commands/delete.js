import UI     from '/lib/ui'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs
    .usage('$0 delete <name> [options]')
    .positional('<name>', {
      describe: 'Name of the account to be deleted',
      type    : 'string'
    })
    .argv
}

const handler = async (argv) => {
  try {
    UI.warning('Deleting an account will definitely disable access to all the funds it holds.')
    await UI.prompt.confirm('Are you sure you want to proceed?')
    const wallet = await Wallet.load(argv.password)
    await wallet.masterAccount.removeAccount(argv.name)
    await Wallet.save(wallet)
    UI.success('Account successfully deleted')
  } catch (err) {
    UI.die(err.message || err)
  }
}

export const _delete = {
  command: 'delete <name>',
  desc   : 'Delete an account',
  builder,
  handler
}
