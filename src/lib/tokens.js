const Tokens = {
  PRV: {
    id      : '0000000000000000000000000000000000000000000000000000000000000004',
    name    : 'Privacy',
    symbol  : 'PRV',
    decimals: 9
  },
  pBTC: {
    id    : 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
    name  : 'Bitcoin',
    symbol: 'pBTC'
  },
  pETH: {
    id      : 'ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f',
    name    : 'Ether',
    symbol  : 'pETH',
    decimals: 9
  }
}

const token = (symbol) => {
  const token = Tokens[symbol] || Tokens['p' + symbol]
  
  if (!token)
    throw new Error('Unknown token ' + symbol)

  return token
}

const id = (symbol) => {
  return token(symbol).id
}

const decimals = (symbol) => {
  return token(symbol).decimals
}

const symbol = (symbol) => {
  return token(symbol).symbol
}
export default {
  id,
  decimals,
  symbol,
  of: async (account, symbol) => {
    if (symbol === 'PRV') {
      return account.nativeToken
    } else {
      return account.getFollowingPrivacyToken(id(symbol))
    }
  }
}

/*
  //   PRV: PRV_ID,
  //   USDT: config.USDT_TOKEN_ID,
  //   BTC: 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
  //   ETH: 'ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f',
  //   BUSD: '9e1142557e63fd20dee7f3c9524ffe0aa41198c494aa8d36447d12e85f0ddce7',
  //   USDC: '1ff2da446abfebea3ba30385e2ca99b0f0bbeda5c6371f4c23c939672b429a42',
  //   BNB: 'b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b',
  //   DAI: '3f89c75324b46f13c7b036871060e641d996a24c09b3065835cb1d38b799d6c1',
  //   SAI: 'd240c61c6066fed0535df9302f1be9f5c9728ef6d01ce88d525c4f6ff9d65a56',
  //   TUSD: '8c3a61e77061265aaefa1e7160abfe343c2189278dd224bb7da6e7edc6a1d4db',
  //   TOMO: 'a0a22d131bbfdc892938542f0dbe1a7f2f48e16bc46bf1c5404319335dc1f0df',
  //   LINK: 'e0926da2436adc42e65ca174e590c7b17040cd0b7bdf35982f0dd7fc067f6bcf',
  //   BAT: '1fe75e9afa01b85126370a1583c7af9f1a5731625ef076ece396fcc6584c2b44',
  //   BAND: '2dda855fb4660225882d11136a64ad80effbddfa18a168f78924629b8664a6b3',
  //   ZRX: 'de395b1914718702687b477703bdd36e52119033a9037bb28f6b33a3d0c2f867',
  //   FTM: 'd09ad0af0a34ea3e13b772ef9918b71793a18c79b2b75aec42c53b69537029fe',
  //   ZIL: '880ea0787f6c1555e59e3958a595086b7802fc7a38276bcd80d4525606557fbc',
  //   MCO: 'caaf286e889a8e0cee122f434d3770385a0fd92d27fcee737405b73c45b4f05f',
  //   GUSD: '465b0f709844be95d97e1f5c484e79c6c1ac51d28de2a68020e7313d34f644fe',
  //   PAX: '4a790f603aa2e7afe8b354e63758bb187a4724293d6057a46859c81b7bd0e9fb',
  //   KCS: '513467653e06af73cd2b2874dd4af948f11f1c6f2689e994c055fd6934349e05',
  //   OMG: '249ca174b4dce58ea6e1f8eda6e6f74ab6a3de4e4913c4f50c15101001bb467b',
*/
