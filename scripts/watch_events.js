const DankNetContract = require('../build/contracts/DankNet.json')

const Api = require('../src/Api').default

module.exports = async (callback) => {
  const contract = require('truffle-contract')
  const dankNet = contract(DankNetContract)
  dankNet.setProvider(web3.currentProvider)
  const dn = await dankNet.deployed()

  dn.MemeAdded().watch(
    (err, response) => Api.post(`/memes/${response.args._memeID}/update_meme/`)
  )

  dn.MemeTransferred().watch(
    (err, response) => Api.post(`/memes/${response.args._memeID}/update_meme/`)
  )

  dn.ValueUpdated().watch(
    (err, response) => Api.post(`/memes/${response.args._memeID}/update_meme/`)
  )
}
