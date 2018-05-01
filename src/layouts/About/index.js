import React from 'react'

const About = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>About</h1>
    </div>
    <div className="full-center dark-text">
      <div
         style={{
          maxWidth: '800px'
        }}
      >
        <p>
          DeCert is a decentralized certificate authority built on top of the Ethereum network.
        </p>
        <p>
          It allows certificate authorities to publish information about the certificates they
          issue to a public network. Then, any member of the network can vote on whether
          or not that certificate has been issued correctly.
        </p>
        <p>
          Voting is run through an ERC20 compliant token. By staking some number of tokens,
          any user in the network can claim that a certificate is fraudulent. Then, web clients being
          presented with these certificates can 
        </p>
        <p>
          You can find the contract code for DankNet <a target="_blank" href="https://github.com/satoshi-memeamoto/danknet/tree/master/contracts">here</a>.
        </p>
      </div>
    </div>
  </div>
)

export default About
