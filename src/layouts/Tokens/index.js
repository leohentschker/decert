import { connect } from 'react-redux'
import Tokens from './Tokens'

const mapStateToProps = (state, ownProps) => ({
  crowdsale: state.web3.crowdsale,
  contract: state.web3.contract,
  token: state.web3.token,
  web3: state.web3.web3Instance,
  address: state.web3.address,
})

const TokensContainer = connect(mapStateToProps)(Tokens)

export default TokensContainer
