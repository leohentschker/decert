const CertToken = artifacts.require("./CertToken.sol")
const DeCert = artifacts.require("./DeCert.sol")

module.exports = (deployer, network, accounts) => {
  deployer.then(() => DeCert.deployed())
  .then(dc => deployer.deploy(CertToken, dc.address))
}
