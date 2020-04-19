import UI     from '/lib/ui'
import Wallet from '/lib/wallet'

const handler = async (argv) => {
  try {
    if (await Wallet.exists()) {
      UI.warning('You already have a wallet. Creating a new wallet will definitely disable access to all your existing funds.')
      UI.warning("Make sure you have backed up your existing wallet first by running 'incognito wallet export'.")
      await UI.prompt.confirm('Are you sure you want to proceed?')
    }
    const password = await UI.prompt.password('Provide a password to protect your wallet', { confirm: true, message: 'Confirm your password' })
    const wallet = await Wallet.create(password)
    await wallet.masterAccount.removeAccount('Account 0')
    await wallet.masterAccount.addAccount('default')
    await Wallet.save(wallet)
    UI.success('Wallet successfully created')
    UI.title('mnemonic')
    UI.info(wallet.mnemonic)
  } catch (err) {
    UI.die(err.message)
  }
}

export const create = {
  command: 'create',
  desc   : 'Create a new wallet',
  handler
}
