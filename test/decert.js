import expectThrow from './expectThrow'

var DeCert = artifacts.require('./DeCert.sol')
var CertToken = artifacts.require('./CertToken.sol')
var DeCertCrowdsale = artifacts.require('./DeCertCrowdsale.sol')

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const getTime = () =>
  Math.trunc((new Date()).getTime() / 100)

contract('DeCert', async (accounts) => {
  let user1 = accounts[0]
  let user2 = accounts[1]

  it('Check initial variables', async () => {
    let dc = await DeCert.deployed()
    let crowdsale = await DeCertCrowdsale.deployed()
    let token = CertToken.at(await dc.token.call())

    // check the rate on the crowdsale
    assert.equal(1000, await crowdsale.rate.call(), "Incorrect initial rate")

    // check that the crowdsale owns the token
    assert.equal(crowdsale.address, await token.owner.call())

    // check that the deployer owns decert
    assert.equal(user1, await dc.owner.call(), "Incorrect owner")

    // check the initial balance of decert
    assert(web3.toBigNumber(web3.toWei(1000)).equals(await token.balanceOf(dc.address)), "Incorrect initial balance")

    assert(web3.toBigNumber(web3.toWei(1000)).equals(await token.allowance(dc.address, crowdsale.address)), "Incorrect initial allowance")
  })

  it('Test adding a certificate', async () => {
    let dc = await DeCert.deployed()
    let crowdsale = await DeCertCrowdsale.deployed()
    let token = CertToken.at(await dc.token.call())

    // make sure that nothing is in the position
    // initially
    const outEmpty = await dc.getCertificate(user1, 0)
    assert.equal(web3.toBigNumber(outEmpty[0]), 0)

    // add a certificate to the chain
    await dc.addCertificate("google.com", 0, 100)

    const out = await dc.getCertificate(user1, 0)
    assert.equal(out[0], user1)
  })

  it('Test buying tokens', async () => {
    let dc = await DeCert.deployed()
    let crowdsale = await DeCertCrowdsale.deployed()
    let token = CertToken.at(await dc.token.call())

    // check that user1 starts with no tokens
    assert.equal(await token.balanceOf(user1), 0)

    await crowdsale.sendTransaction({
      value: web3.toWei(.001),
      from: user1
    })
    assert((await token.balanceOf(user1)).equals(web3.toWei(1)), "Incorrect balance after transfer")
  })

  it('Test voting on certificate', async () => {
    let dc = await DeCert.deployed()
    let token = CertToken.at(await dc.token.call())

    // check that we do in fact have tokens
    assert((await token.balanceOf(user1)).greaterThan(0), "No balance in vote test")

    // get a certificate
    const cert = await dc.getCertificateByID(0)

    // make sure the cert isn't empty
    assert(web3.toBigNumber(cert[0]) !== 0, "Invalid cert pulled in vote test")

    // vote on the cert
    await dc.voteOnCert(
      user1,
      0,
      true,
      10
    )
    await dc.voteOnCert(
      user1,
      0,
      false,
      20,
    )

    // re-pull the cert from the blockchain
    const votedCert = await dc.getCertificateByID(0)

    // check the vote totals
    assert(votedCert[4].equals(10), "Incorrect valid votes")
    assert(votedCert[5].equals(20), "Incorrect invalid votes")

    // make sure we're storing the votes correctly
    const firstVote = await dc.getVote(0)
    const secondVote = await dc.getVote(1)

    assert.equal(firstVote[0], user1, "Incorrect voter on first vote")
    assert.equal(firstVote[2], true, "Incorrect vote on first vote")
    assert.equal(firstVote[3], 10, "Incorrect vote total for first vote")
  })
})