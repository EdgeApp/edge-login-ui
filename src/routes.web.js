import React, { Component } from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

import Container from './modules/Container.web'
import Signup from './modules/Signup/SignupContainer.web'
import Login from './modules/Login/Login.mobile.js'
import AccountManagement from './modules/AccountManagement/AccountManagement.mobile.js'
import ChangePin from './modules/ChangePin/ChangePin.mobile.js'
import ChangePassword from './modules/ChangePassword/ChangePassword.mobile.js'
import PasswordRecovery from './modules/PasswordRecovery/PasswordRecovery.mobile.js'
import PasswordRecoveryToken from './modules/PasswordRecoveryToken/PasswordRecoveryToken.mobile.js'

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
