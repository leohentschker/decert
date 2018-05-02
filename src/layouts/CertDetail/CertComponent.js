/* global microlink */
import React, { Component } from 'react'
import { Link } from 'react-router'

import { PRIMARY_COLOR } from '../../constants'
import { getPreviewLink } from '../../util/helpers'
import Api from '../../Api'
import {
  undecimalizeToken,
  decimalizeTokenStr,
}
from '../../util/token'

export default class MemeDetail extends Component {

  constructor(props) {
    super(props)

    this.vote = this.vote.bind(this)
    
    this.state = {
      valid: true,
      votes: 0,
    }
  }

  async vote(e) {
    e.preventDefault()

    if (this.state.votes <= 0) {
      return
    }

    try {
      await this.props.contract.voteOnCert(
        this.props.cert.issuer,
        this.props.cert.serialID,
        this.state.valid,
        this.state.votes,
        {
          from: this.props.web3.eth.coinbase,
        }
      )
      this.setState({
        votes: 0,
        msg: 'Vote submitted to the network.',
      })
    } catch(e) {
      this.setState({ msg: 'Error voting. Make sure you aren\'t inputting more tokens than you own!' })
    }
  }

  componentDidMount() {
    microlink(".ca-link")
  }

  render() {
    return (
      <div className="cert-detail">
        <div
          className="material-shadow padding"
          style={{
            background: "white",
            maxWidth: 800,
          }}
        >
          <div className="full-width full-center margin-top">
            <a className="ca-link full-width" href={getPreviewLink(this.props.cert.domain)} />
          </div>
          <div className="value full-center columns margin-top dark-text medium-font">
            <div
              style={{
                margin: '5px',
              }}
            >
              Issuer: {this.props.cert.issuer}
            </div>
            <div
              style={{
                margin: '5px',
              }}
            >
              Owner: {this.props.cert.owner}
            </div>
            <div
              style={{
                margin: '5px',
                marginBottom: '20px',
              }}
            >
              Signature: {this.props.cert.signature}
            </div>
            <div className="margin-top flex rows">
              <div className="margin-right">
                Valid votes: {this.props.cert.valid_votes}
              </div>
              <div className="margin-left">
                Invalid votes: {this.props.cert.invalid_votes}
              </div>
            </div>
          </div>
        </div>
        <div
          className="cert-actions full-center columns"
          style={{
            marginTop: '30px',
          }}
        >
          {
            this.state.msg &&
            <div
              style={{
                margin: '20px',
                fontSize: 18,
              }}
            >
              {this.state.msg}
            </div>
          }
            <div className="full-width columns">
              <h2 className="full-center dark-text big-font">
                Vote On Certificate
              </h2>
              <div className="valid-toggle rows flex margin-top">
                <div
                  className="flex1 text-center material-shadow pointer full-center"
                  style={{
                    background: this.state.valid ? PRIMARY_COLOR : "white",
                    color: this.state.valid ? "white" : PRIMARY_COLOR,
                    height: 40,
                    margin: 5,
                    fontSize: 20,
                    borderRadius: 2
                  }}
                  onClick={() => this.setState({ valid: true })}
                >
                  <span>Valid</span>
                </div>
                <div
                  className="flex1 text-center material-shadow pointer full-center"
                  style={{
                    background: !this.state.valid ? PRIMARY_COLOR : "white",
                    color: !this.state.valid ? "white" : PRIMARY_COLOR,
                    height: 40,
                    margin: 5,
                    fontSize: 20,
                    borderRadius: 2
                  }}
                  onClick={() => this.setState({ valid: false })}
                >
                  <span>Invalid</span>
                </div>
              </div>
              <form
                className="margin-top"
                onSubmit={this.vote}
              >
                <div className="form-group">
                  <input
                    id="input-transfer"
                    type="number"
                    className="form-control margin-right-small"
                    value={this.state.votes}
                    onChange={e => this.setState({
                      votes: e.target.value
                    })}
                    placeholder="Number of votes"
                  />
                </div>
                <div className="full-width full-center">
                  <button
                    type="submit"
                    className="btn btn-primary submit-button"
                  >
                    Submit Vote
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    )
  }
}
