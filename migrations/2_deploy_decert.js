const DeCert = artifacts.require("./DeCert.sol")

module.exports = (deployer, network, accounts) =>
  deployer.deploy(DeCert)
