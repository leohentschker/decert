var Migrations = artifacts.require("./Migrations.sol");

module.exports = deployer => {
  web3.eth.getAccounts((e, d) => console.log(d[0]))
  deployer.deploy(Migrations)
}
