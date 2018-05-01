import React, { Component } from 'react'

import { decimalizeToken } from '../../util/token'

export default class Balance extends Component {
  state = {
    balance: null,
  }

  async componentDidMount() {
    const balanceBigNum = await this.props.token.balanceOf(
      this.props.web3.eth.coinbase
    )
    const balance = decimalizeToken(balanceBigNum.toNumber())
    this.setState({ balance })
  }

  render() {
    return <span>{this.state.balance} CT</span>
  }
}
