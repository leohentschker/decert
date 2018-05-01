import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import MissingWeb3 from '../../components/MissingWeb3'
import Balance from './Balance'

class Tokens extends Component {
  state = {
    numTokens: 1,
  }

  constructor(props) {
    super(props)
    this.buyTokens = this.buyTokens.bind(this)
  }

  async buyTokens(e) {
    e.preventDefault()
    const value = this.props.web3.toWei(this.state.numTokens / 1000)

    this.props.web3.eth.sendTransaction({
      from: this.props.web3.eth.coinbase,
      to: this.props.crowdsale.address,
      value,
    }, (e, d) => {
      if (!e) {
        browserHistory.push('/tokens/purchase_success')
      }
    })
  }

  render() {
    return(
      <div className="page-container">
        <div className="page-header">
          <h1>DeCert Tokens</h1>
        </div>
        <div className="page-content full-size full-center columns dark-text">
          {
            this.props.token &&
            <h3>Current balance: <Balance web3={this.props.web3} token={this.props.token}/></h3>
          }
          <p className="dark-text margin-top">
            CertTokens are used to vote on the network.
            CertTokens are sold for .001 eth each.
          </p>
          {
            this.props.contract ? (
              <div className="dark-text margin-top">
                <form
                  onSubmit={this.buyTokens}
                  className="form-inline"
                >
                  <div className="form-group">
                    <label
                      className="dark-text margin-right-small"
                    >
                      Number of tokens to buy:
                    </label>
                    <input
                      className="form-control margin-right-small"
                      value={this.state.numTokens}
                      onChange={e =>
                        this.setState({ numTokens: parseInt(e.target.value, 10) })
                      }
                      type="number"
                      min="1"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary submit-button"
                    >
                      Buy Tokens
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <MissingWeb3
                message="buy tokens"
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default Tokens
