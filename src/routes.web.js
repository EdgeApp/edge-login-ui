import React, { Component } from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

import Container from './modules/Container.web'
import Login from './modules/Login/Login.web'
import Username from './modules/Username/Username.web'
import PinNumber from './modules/PinNumber/PinNumber.web'
import Password from './modules/Password/Password.web'
import ReviewDetails from './modules/ReviewDetails/ReviewDetails.web'
import Home from './modules/Home/Home.web'

import ChangePassword from './modules/ChangePassword/ChangePassword.web'
import ChangePin from './modules/ChangePin/ChangePin.web'
import PasswordRecovery from './modules/PasswordRecovery/PasswordRecovery.web'

export default class RouterComponent extends Component {

  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRedirect to='/login' />
          <Route path='/login' component={Login} />

          <Route path='/signup/username' component={Username} />
          <Route path='/signup/pin' component={PinNumber} />
          <Route path='/signup/password' component={Password} />
          <Route path='/signup/review' component={ReviewDetails} />
          <Route path='/home' component={Home} />

          <Route path='/changePassword' component={ChangePassword} />
          <Route path='/changePin' component={ChangePin} />
          <Route path='/passwordRecovery' component={PasswordRecovery} />
        </Route>
      </Router>
    )
  }
}
