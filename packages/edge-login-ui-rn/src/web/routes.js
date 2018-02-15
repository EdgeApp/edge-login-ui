import React, { Component } from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

import Container from './modules/Container.web'
import Signup from './modules/Signup/SignupContainer.web'
import Login from './modules/Login/Login.web'
import Home from './modules/Home/Home.web'
import ReviewDetails from './modules/ReviewDetails/ReviewDetails.web'

export default class RouterComponent extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRedirect to='/login' />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/review' component={ReviewDetails} />
          <Route path='/home' component={Home} />
        </Route>
      </Router>
    )
  }
}
