import React, { Component } from 'react'
import { IndexRedirect, Route, Router, hashHistory } from 'react-router'

import AccountManagement from './modules/AccountManagement/AccountManagement.js'
import ChangePassword from './modules/AccountManagement/ChangePassword/ChangePassword.js'
import ChangePin from './modules/AccountManagement/ChangePin/ChangePin.js'
import PasswordRecovery from './modules/AccountManagement/PasswordRecovery/PasswordRecovery.js'
import PasswordRecoveryToken from './modules/AccountManagement/PasswordRecoveryToken/PasswordRecoveryToken.js'
import Container from './modules/Container.js'
import Login from './modules/Login/Login.js'
import Signup from './modules/Signup/Signup.js'

export default class RouterComponent extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Container}>
          <IndexRedirect to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/account" component={AccountManagement} />
          <Route path="/changepin" component={ChangePin} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/passwordrecovery" component={PasswordRecovery} />
          <Route
            path="/passwordrecoverytoken"
            component={PasswordRecoveryToken}
          />
        </Route>
      </Router>
    )
  }
}
