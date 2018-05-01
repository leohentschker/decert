import ReactDOM from 'react-dom'
import React from 'react'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router'
import {
  syncHistoryWithStore
} from 'react-router-redux'
import {
  Provider
} from 'react-redux'

import getWeb3 from './util/web3/getWeb3'
import store from './store'
import './index.css'

const history = syncHistoryWithStore(browserHistory, store)

getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={require('./App').default}>
          <IndexRoute
            component={require('./layouts/Home').default}
          />
          <Route
            component={require('./layouts/PurchaseSuccess').default}
            path="/tokens/purchase_success"
          />
          <Route
            component={require('./layouts/CertDetail').default}
            path="/certificates/:certID"
          />
          <Route
            component={require('./layouts/Tokens').default}
            path="/tokens"
          />
          <Route
            component={require('./layouts/About').default}
            path="/about"
          />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
