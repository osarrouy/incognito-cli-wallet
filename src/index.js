#!/usr/bin/env node

import      yargs    from 'yargs'
import * as commands from './commands'
import      config   from './lib/config'

const run = async () => {
  await config.paths.enforce()

  yargs
    .usage('incognito <command>')
    .option('p', {
      alias   : 'password',
      describe: 'Password of the wallet',
      type    : 'string'
    })
    .command(commands.balance)
    .command(commands.deposit)
    .command(commands.history)
    .command(commands.receive)
    .command(commands.send)
    .command(commands.wallet)
    .command(commands.account)
    .demandCommand(1, 'No command provided')
    .help()
    .alias('h', 'help')
    .argv
}

run()
