import UI     from '/lib/ui'
import Wallet from '/lib/wallet'
import path   from 'path'

const builder = (yargs) => {
  return yargs
    .usage('$0 wallet export <path> [options]')
    .positional('<path>', {
      describe: 'Path of the file the wallet is to be exported to',
      type    : 'string'
    })
    .argv
}

const handler = async (argv) => {
  try {
    const wallet     = await Wallet.load(argv.password)
    const passphrase = await UI.prompt.password('Provide a password to encrypt your exported wallet', { confirm: true, message: 'Confirm your password' })
    await Wallet.export(wallet, passphrase, argv.path)
    UI.success('Wallet successfully exported to ' + path.resolve(argv.path))
  } catch (err) {
    UI.die(err.message || err)
  }
}

export const _export = {
  command: 'export <path>',
  desc   : 'Export wallet for backup',
  builder,
  handler
}
