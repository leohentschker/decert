const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const contract = require("truffle-contract")
const path = require('path')

const decertJSON = require(path.join(__dirname, 'build/contracts/DeCert.json'))

const infura = process.env.INFURA
const infura_url = "https://ropsten.infura.io/" + infura

const mnemonic = process.env.ETH_MNEMONIC

const provider = new HDWalletProvider(mnemonic, infura_url)

const INFURA_ADDRESS = "0x4557b1e0d982d270d16e232d0cf45928a5772834"

const DeCert = contract(decertJSON)
DeCert.setProvider(provider)

var deCert

DeCert.deployed()
.then(i => {
  deCert = i
})

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

    deCert.addCertificate(
      domain,
      serialID,
      duration,
      {
        from: INFURA_ADDRESS,
      }
    )
  }
)


app.listen(port, () => console.log(`Running webserver on port: ${port}`))
