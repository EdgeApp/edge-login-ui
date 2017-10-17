import React, { Component } from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

import Container from './modules/Container.js'
import Signup from './modules/Signup/Signup.js'
import Login from './modules/Login/Login.js'
import AccountManagement from './modules/AccountManagement/AccountManagement.js'
import ChangePin from './modules/ChangePin/ChangePin.js'
import ChangePassword from './modules/ChangePassword/ChangePassword.js'
import PasswordRecovery from './modules/PasswordRecovery/PasswordRecovery.js'
import PasswordRecoveryToken from './modules/PasswordRecoveryToken/PasswordRecoveryToken.js'

export default class RouterComponent extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRedirect to='/login' />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/account' component={AccountManagement} />
          <Route path='/changepin' component={ChangePin} />
          <Route path='/changepassword' component={ChangePassword} />
          <Route path='/passwordrecovery' component={PasswordRecovery} />
          <Route path='/passwordrecoverytoken' component={PasswordRecoveryToken} />
        </Route>
      </Router>
    )
  }
}
