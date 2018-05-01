require('regenerator-runtime/runtime')
require('babel-register')
var HDWalletProvider = require("truffle-hdwallet-provider")

const mnemonic = process.env.ETH_MNEMONIC
const infura = process.env.INFURA
console.log("https://ropsten.infura.io/" + infura)
if (!infura) {
  console.log('Unable to find INFURA env variable')
}

module.exports = {
  networks: {
    // make sure you unlock your account
    "test": {
      network_id: 1,
      host: 'localhost',
      port: 8546,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura),
      network_id: 3,
      gas: 4001021,
      gasPrice: 40000000000,
    },
    "local": {
      network_id: 1,
      host: 'localhost',
      port: 8545,
      gas: 6721975,
    }
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
}
