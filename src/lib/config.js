import fs   from 'fs'
import os   from 'os'
import path from 'path'

const root = path.join(path.join(os.homedir(), '.incognito'))

export default {
  paths: {
    db     : path.join(root, '_db'),
    wallet : path.join(root, '_wallet.backup'),
    enforce: async () => {
      await fs.promises.mkdir(root, { recursive: true })
    }
  }
}
