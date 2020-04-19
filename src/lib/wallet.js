import config    from '/lib/config'
import incognito from '/lib/incognito'
import UI        from '/lib/ui'
import fs        from 'fs'

export default {
  exists: async () => {
    try {
      await fs.promises.access(config.paths.wallet)
      return true
    } catch (err) {
      return false
    }
  },
  create: async (password) => {
    const { WalletInstance } = await incognito.load({ wasm: true })

    const wallet     = new WalletInstance()
    await wallet.init(password, '_default')

    return wallet
  },
  save: async (wallet, passphrase) => {
    if (passphrase) wallet.passPhrase = passphrase
    const backup = wallet.backup(wallet.passPhrase)
    await fs.promises.writeFile(config.paths.wallet, backup, 'utf8')

    return wallet
  },
  load: async (password, opts = { wasm: false }) => {
    try {
      const { WalletInstance } = await incognito.load(opts)

      const backup     = String(fs.readFileSync(config.paths.wallet))
      const passphrase = password || await UI.prompt.password('Provide a password to unlock your wallet')
      const wallet     = await WalletInstance.restore(backup, passphrase)

      return wallet
    } catch (err) {
      if (err.message === 'Malformed UTF-8 data') UI.die('Invalid password')
      if (err.code === 'ENOENT') UI.die("Wallet not found. Please run 'incognito wallet create' first.")

      UI.die(err.message)
    }
  },
  import: async (path) => {
    try {
      const { WalletInstance } = await incognito.load()

      const backup     = String(fs.readFileSync(path))
      const passphrase = await UI.prompt.password('Provide a password to unlock your backup file')
      const wallet     = await WalletInstance.restore(backup, passphrase)

      return wallet
    } catch (err) {
      if (err.message === 'Malformed UTF-8 data') { UI.die('Invalid password') }

      UI.die(err.message)
    }
  },
  export: async (wallet, password, path) => {
    const backup = await wallet.backup(password)
    await fs.promises.writeFile(path, backup, 'utf8')
  },
  history: async (account, token = null) => {
    const { historyServices } = require('incognito-js/build/node')

    return historyServices.getTxHistoryByPublicKey(account.key.keySet.publicKeySerialized, token)
  }
}
