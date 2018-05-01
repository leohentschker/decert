import PropTypes from 'prop-types'
import React from 'react'

const MissingWeb3 = ({ message }) => (
  <div className="text-center">
    <p>
      You must be connected to the ethereum network to {message}.
      We suggest using <a href="https://metamask.io/" target="_blank">MetaMask</a>.
    </p>
  </div>
)

MissingWeb3.propTypes = {
  message: PropTypes.string.isRequired,
}

export default MissingWeb3
