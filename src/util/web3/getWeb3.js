import Web3 from 'web3'

import DeCertCrowdsaleContract from '../../../build/contracts/DeCertCrowdsale.json'
import CertTokenContract from '../../../build/contracts/CertToken.json'
import DeCertContract from '../../../build/contracts/DeCert.json'
import store from '../../store'

const MAX_TIMEOUT = 2000

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise((resolve, reject) => {
  window.addEventListener('load', (dispatch) => {
    var results
    var web3 = window.web3

    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      // instantiate the contract
      const contract = require('truffle-contract')
      const crowdsale = contract(DeCertCrowdsaleContract)
      const deCert = contract(DeCertContract)
      const token = contract(CertTokenContract)
      deCert.setProvider(web3.currentProvider)
      token.setProvider(web3.currentProvider)
      crowdsale.setProvider(web3.currentProvider)

      results = {
        web3Instance: web3,
      }

      deCert.deployed().then(instance => results.contract = instance)
      .then(() => token.deployed())
      .then(token => results.token = token)
      .then(() => crowdsale.deployed())
      .then(crowdsale => results.crowdsale = crowdsale)
      .then(() => resolve(store.dispatch(web3Initialized(results))))

      setTimeout(MAX_TIMEOUT, resolve(store.dispatch(web3Initialized(results))))
    }
  })
})

export default getWeb3
