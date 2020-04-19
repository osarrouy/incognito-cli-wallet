import UI     from '/lib/ui'
import Wallet from '/lib/wallet'

const builder = (yargs) => {
  return yargs
    .usage('$0 wallet immport <path> [options]')
    .positional('<path>', {
      describe: 'Path of the file the wallet is to be imported from',
      type    : 'string'
    })
    .argv
}

const handler = async (argv) => {
  try {
    if (await Wallet.exists()) {
      UI.warning('You already have a wallet. Importing a new wallet will definitely disable access to all your existing funds.')
      UI.warning("Make sure you have backed up your existing wallet first by running 'incognito wallet export'.")
      await UI.prompt.confirm('Are you sure you want to proceed?')
    }
    const wallet   = await Wallet.import(argv.path)
    const password = await UI.prompt.password('Provide a password to protect your wallet', { confirm: true, message: 'Confirm your password' })
    await Wallet.save(wallet, password)
    UI.success('Wallet successfully imported')
  } catch (err) {
    UI.die(err.message || err)
  }
}

export const _import = {
  command: 'import <path>',
  desc   : 'Import wallet from backup file',
  builder,
  handler
}
