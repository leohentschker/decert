import React from 'react'

import CertList from '../../components/CertList'

const Home = ({ web3, address }) => (
  <div className="page-content full-width">
    <CertList
      emptyMessage="No certificates found"
      initialURL="/certificates/"
      address={address}
      web3={web3}
    />
  </div>
)

export default Home
