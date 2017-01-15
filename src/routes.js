import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Container from './modules/Container'
import Username from './modules/Username/Username.web'
import PinNumber from './modules/PinNumber/PinNumber.web'
import Password from './modules/Password/Password.ui'

export default class RouterComponent extends Component {

  render () {
    return (
        <Router history={browserHistory}>
          <Route path="/" component={Container}>
            <IndexRedirect to="/signup/username" />
            <Route path="/signup/username" component={Username}/>
            <Route path="/signup/pin" component={PinNumber}/>
            <Route path="/signup/password" component={Password}/>
          </Route>
        </Router>
    )
  }
}
