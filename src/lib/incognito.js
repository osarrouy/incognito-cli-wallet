import capcon from 'capture-console'
import level  from 'level'
import ora    from 'ora'
import config from './config'

export default {
  load: async (opts = { wasm: false }) => {
    // intercept incognito logs
    capcon.startIntercept(process.stdout, () => {})
    // load incognito module
    const incognito = require('incognito-js/build/node')
    // implement storage service
    incognito.storageService.implement({
      setMethod: async (key, value) => {
        const db = level(config.paths.db)
        await db.put(key, value)
        db.close()
      },
      getMethod: async (key) => {
        try {
          const db = level(config.paths.db)
          const value = await db.get(key)
          db.close()
          return value
        } catch (err) {
          db.close()
          if (err.type == 'NotFoundError') return null
          throw err
        }
      },
      removeMethod: async (key) => {
        const db = level(config.paths.db)
        await db.del(key)
        db.close()
      }
    })
    // stop intercepting incognito logs
    capcon.stopIntercept(process.stdout)
    // set incognito log method to null
    incognito.setConfig({ logMethod: null })
    // load wasm binary
    if (opts.wasm) {
      const spinner = ora('loading wasm binary').start()
      await incognito.goServices.implementGoMethodUseWasm()
      spinner.stop()
    }
    // return initialized incognito module
    return incognito
  }
}
