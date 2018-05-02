const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const contract = require("truffle-contract")
const path = require('path')

const decertJSON = require(path.join(__dirname, 'build/contracts/DeCert.json'))

const infura = process.env.INFURA
const infura_url = "https://ropsten.infura.io/" + infura

const mnemonic = process.env.ETH_MNEMONIC

const provider = new HDWalletProvider(mnemonic, infura_url)

const DeCert = contract(decertJSON)
DeCert.setProvider(provider)

var deCert

DeCert.deployed()
.then(i => deCert = i)

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 8067

app.post('/add_cert',
  (req, res) => {
    if (!req.body || req.body.domain === undefined || req.body.serialID === undefined || req.body.duration === undefined) {
      res.status(400)
      res.send("Missing input parameters")
      return
    }

    const domain = req.body.domain
    const serialID = req.body.serialID
    const duration = req.body.duration

    console.log(deCert.address)
    deCert.getCertificateByID(0)
    .then(out => console.log(out))

    res.send("ASDASD")
    // deCert.addCertificate(domain, serialID, duration)
    // .then(res.send("Certificate uploaded successfully"))
  }
)


app.listen(port, () => console.log(`Running webserver on port: ${port}`))

