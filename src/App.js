import React from 'react'
import { Link } from 'react-router'

import './App.css'

const App = ({ children }) => (
  <main className="columns">
    <nav id="top-bar" className="navbar">
      <div className="container-fluid container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#danknet-nav">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link
            className="navbar-brand"
            to="/"
            style={{marginTop: 25}}
          >
            Decert
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="danknet-nav">
          <ul className="nav navbar-nav navbar-right">
            {/*
              <li className="nav-item" data-toggle="collapse" data-target="#danknet-nav">
                <Link to="/portfolio" activeClassName="active" className="nav-link">My Portfolio</Link>
              </li>
            */}
            <li className="nav-item" data-toggle="collapse" data-target="#danknet-nav">
              <Link to="/tokens" activeClassName="active" className="nav-link">CertTokens</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#danknet-nav">
              <Link to="/about" activeClassName="active" className="nav-link">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="page-container container">
      {children}
    </div>
  </main>
)

export default App
