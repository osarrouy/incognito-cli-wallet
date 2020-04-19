import * as commands from './commands'

const builder = (yargs) => {
  return yargs
    .usage('incognito wallet <subcommand>')
    .command(commands.create)
    .command(commands._export)
    .command(commands._import)
    .demandCommand(1, 'No subcommand provided')
    .help()
    .version(false)
}

export const wallet = {
  command: 'wallet <subcommand>',
  desc   : 'Manage wallet',
  builder
}
