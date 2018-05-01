import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-select/dist/react-select.css'

import Cert from './Cert'
import Api from '../../Api'

const chunk = (lst, size) => {
  var chunks = []
  var i, j
  for (i=0 , j=lst.length; i < j; i += size) {
    chunks.push(lst.slice(i , i + size))
  }
  return chunks
}

const FilterSelect = ({ name, updateFilter, active, address }) => (
  <div
    style={{
      color: "#656256",
      margin: 20,
    }}
    className={`rows flex aligned-center pointer ${address ? '' : 'invalid'}`}
    onClick={updateFilter}
  >
    <div style={{
      width: 10,
      height: 10,
      borderRadius: 10,
      background: active ? "#EABE7C" : null,
      border: '1px solid #EABE7C',
      marginRight: 5,
    }}/>
    <span style={{color: active ? null : '#958b7c'}}>{name}</span>
  </div>
)

export default class CertList extends Component {
  static propTypes = {
    emptyMessage: PropTypes.string.isRequired,
    initialURL  : PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.loadCerts = this.loadCerts.bind(this)

    this.state     = {
      search: "",
      totalCerts: 0,
      nextUrl: null,
      certificates: null,
    }
  }

  updateUrl() {
    var url = `/certificates/?ordering=-id`

    if (this.state.owned) {
      url += `&owner=${this.props.address}`
    }

    if (this.state.issued) {
      url += `&issuer=${this.props.address}`
    }

    if (this.state.voted) {
      url += `&voted_by=${this.props.address}`
    }

    if (this.state.search) {
      url += `&domain_contains=${encodeURI(this.state.search)}`
    }

    this.setState({
      nextUrl: url,
    })
  }

  async loadCerts() {
    const certResponse = await Api.get(this.state.nextUrl)
    const previousCerts = this.state.certificates ? this.state.certificates : []

    this.setState({
      certificates: previousCerts.concat(certResponse.data.results),
      totalCerts: certResponse.data.count,
      nextUrl: certResponse.data.next,
    })
  }

  async updateFilters() {
    await this.setState({ certificates: null })
    await this.updateUrl()
    this.loadCerts()
  }

  componentDidMount() {
    setTimeout(async () => {
      await this.updateUrl()
      this.loadCerts()      
    }, 500)
  }

  render() {

    return (
      <div
        className="cert-list full-center columns full-width"
        style={{
          marginBottom: '50px',
        }}
      >
        <div className="full-width">
          <div
            className="filter-wrapper full-width rows flex"
            style={{
              borderBottom: '1px solid #dadada',
              borderTop: '1px solid #dadada',
            }}
          >
            <FilterSelect
              name="Certificates I own"
              active={this.state.owned}
              address={this.props.address}
              updateFilter={() =>
                this.props.address &&
                this.setState({ owned: !this.state.owned }, this.updateFilters)
              }
            />
            <FilterSelect
              name="Certificates I've issued"
              active={this.state.issued}
              address={this.props.address}
              updateFilter={() =>
                this.props.address &&
                this.setState({ issued: !this.state.issued }, this.updateFilters)
              }
            />
            <FilterSelect
              name="Certificates I've voted on"
              active={this.state.voted}
              address={this.props.address}
              updateFilter={() =>
                this.props.address &&
                this.setState({ voted: !this.state.voted }, this.updateFilters)
              }
            />
            <div className="flex full-center columns" style={{flex: 1, }}>
              <div
                className="flex full-center rows"
                style={{
                  alignSelf: 'flex-end',
                }}
              >
                <span className="margin-right-small">Domain Contains: </span>
                <div className="input-group flex rows">
                  <input
                    type="text"
                    className="form-control margin-right-small"
                    placeholder="example.com"
                    aria-describedby="basic-addon1"
                    value={this.state.search}
                    onKeyPress={e => e.key == "Enter" && this.updateFilters()}
                    onChange={e => this.setState({ search: e.target.value })}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary submit-button" type="button">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{margin: 20, color: "#656256"}}>{this.state.totalCerts} total certificates</div>
        </div>
        {
          this.state.certificates ? (
            <div className="flex columns full-width">
              {
                this.state.certificates.length ? (
                  chunk(this.state.certificates, 4).map((chunk, idx) =>
                    <div className="cert-list flex rows full-center" key={idx}>
                      {
                        chunk.map(c =>
                          <Cert
                            address={this.props.address}
                            key={c.id}
                            {...c}
                          />
                        )
                      }
                    </div>
                  )
                ) : (
                  <div className="full-center">
                    <p className="empty-text">{this.props.emptyMessage}</p>
                  </div>
                )
              }
            </div>
          ) : (
            <div>
              <p className="empty-text">Loading...</p>
            </div>
          )
        }
        {
          this.props.nextUrl &&
          <div style={{
            margin: '50px',
          }}>
            <button onClick={this.loadCerts} type="button">Load More</button>
          </div>
        }
      </div>

    )
  }
}
