import chalk     from 'chalk'
import columnify from 'columnify'
import inquirer  from 'inquirer'
import qrcode    from 'qrcode-terminal'

export const info = (_message) => {
  // console.log(chalk.blue("+ " + _message));
  console.log(_message)
}

const UI = {
  prompt: {
    accounts: async (wallet, message = 'Pick an account') => {
      const accounts = wallet.masterAccount.getAccounts()
      const names    = accounts.map((_account) => _account.name)
      const name     = await UI.prompt.list(names, message)

      return accounts.filter((_account) => _account.name === name)[0]
    },
    password: async (message, opts = { confirm: false }) => {
      const { password } = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message
        }
      ])

      if (opts.confirm) {
        await inquirer.prompt([
          {
            type   : 'password',
            name   : 'password',
            message: opts.message,
            validate: (input) => {
              if (input === password) {
                return true
              } else {
                return 'Passwords do not match'
              }
            }
          }
        ])
      }

      return password
    },
    confirm: async (message) => {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmed',
          message
        }
      ])

      if (answers.confirmed) return

      UI.exit()
    },
    list: async (choices, message) => {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'picked',
          choices,
          message
        }
      ])
      return answers.picked
    }
  },
  columns: (data) => {
    console.log(columnify(data))
  },
  qrcode: (message) => {
    qrcode.generate(message, {
      small: true
    })
  },
  success: (message) => {
    console.log('🎉 ' + chalk.green(message))
  },
  warning: (message) => {
    console.log('⚠️  ' + chalk.yellow(message))
  },
  info: (message) => {
    console.log(message)
  },
  title: (message) => {
    console.log('-] ' + chalk.cyan(message))
  },
  die: (message) => {
    if (message) console.error(chalk.red(message))
    process.exit(1)
  },
  exit: () => {
    process.exit(0)
  }
}

export default UI
