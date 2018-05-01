const DeCertCrowdsale = artifacts.require("./DeCertCrowdsale.sol")
const CertToken = artifacts.require("./CertToken.sol")
const DeCert = artifacts.require("./DeCert.sol")

module.exports = (deployer, network, accounts) => {

  var startOffset
  switch (network) {
    case "local":
        startOffset = 2
        break
    case "ropsten":
        startOffset = 120
        break
    default:
      throw `Unknown network ${network}`
  }

  var startTime
  try {
    startTime = web3.eth.getBlock('latest').timestamp + startOffset
  } catch(err) {
    startTime = Math.trunc((new Date()).getTime() / 1000) + startOffset
  }

  const ethRate = 1000
  const wallet = accounts[0]

  var crowdsale, token, decert
  deployer.then(() => CertToken.deployed())
  .then(tok => token = tok)
  .then(() => DeCert.deployed())
  .then(dc => decert = dc)
  .then(() => deployer.deploy(
      DeCertCrowdsale,
      ethRate,
      wallet,
      token.address,
      decert.address)
  )
  .then(() =>
    DeCertCrowdsale.deployed()
  )
  .then(dcs => {
    crowdsale = dcs
    token.transferOwnership(crowdsale.address)
  })
  .then(() => decert.setToken(token.address))
  .then(() => decert.setCrowdsale(crowdsale.address))
  .catch(err => console.log(err, "THE ERRR"))
}
