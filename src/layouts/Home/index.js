import { connect } from 'react-redux'
import Home from './Home'

const mapStateToProps = (state, ownProps) => ({
  address: state.web3.address,
  web3: state.web3.web3Instance,
})


const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
