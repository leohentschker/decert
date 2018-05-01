import React, { Component } from 'react'

import { getCertificate } from '../../util/contractHelpers'
import CertComponent from './CertComponent'
import Api from '../../Api'

const CERT_TIMEOUT = 500

export default class CertDetail extends Component {
  state = {
    cert: null,
  }

  async pullFromApi() {
    const resp = await Api.get(`/certificates/${this.props.params.certID}/`)
    if (resp.ok) {
      this.setState({ cert: resp.data })
    }    
  }

  componentDidMount() {
    setTimeout(
      () => this.pullFromApi(),
      CERT_TIMEOUT
    )
  }

  render() {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Certificate for {this.state.cert && this.state.cert.domain}</h1>
        </div>
        <div className="full-center columns">
          {
            this.state.cert ? (
              <CertComponent
                contract={this.props.contract}
                cert={this.state.cert}
                web3={this.props.web3}
              />
            ) : (
              <div>Loading cert...</div>
            )
          }
          <div style={{
            marginTop: '50px',
          }}>
          </div>
        </div>
      </div>
    )
  }
}
