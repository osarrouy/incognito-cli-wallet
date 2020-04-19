import * as commands from './commands'

const builder = (yargs) => {
  return yargs
    .usage('incognito account <subcommand>')
    .command(commands.create)
    .command(commands._delete)
    .command(commands.list)
    .demandCommand(1, 'No subcommand provided')
    .help()
    .version(false)
}

export const account = {
  command: 'account <subcommand>',
  desc   : 'Manage accounts',
  builder
}
