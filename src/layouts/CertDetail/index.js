import { connect } from 'react-redux'
import CertDetail from './CertDetail'

const mapStateToProps = (state, ownProps) => ({
  contract: state.web3.contract,
  web3: state.web3.web3Instance,
})


const CertDetailContainer = connect(mapStateToProps)(CertDetail)

export default CertDetailContainer
