/* global microlink */
import React, { Component } from 'react'
import { Link } from 'react-router'

import timeAgo from '../../util/timeago'
import { getPreviewLink } from '../../util/helpers'

export default class Cert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: props.liked,
      likes: props.likes,
    }
  }

  componentDidMount() {
    microlink(".ca-link")
  }

  render() {
    return (
      <div
        className="full-center columns"
        style={{
          margin: '60px',
          maxWidth: '30%'
        }}
      >
        <div
          className="material-shadow full-width"
        >
          <a className="ca-link" href={getPreviewLink(this.props.domain)} />
        </div>
        <div
          className="info"
          style={{
            marginTop: '10px',
          }}
        >
          <div
            className="full-center columns"
            style={{fontSize: 15}}
          >
            <Link
              to={`/certificates/${this.props.id}/`}
              style={{
                margin: '5px',
                fontSize: 20,
              }}
            >
              <div>{this.props.domain}</div>
            </Link>
            <div
              className="full-width text-center"
              style={{
                margin: '5px',
              }}
            >
              Owner: {this.props.owner.slice(0, 20)}...
            </div>
            <div
              className="full-width text-center"
              style={{
                margin: '5px',
              }}
            >
              Created {timeAgo(this.props.submitted)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}