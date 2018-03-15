// @flow

import React, { Component } from 'react'

import AccountManagement from './modules/AccountManagement/AccountManagement.js'
import ChangePassword from './modules/AccountManagement/ChangePassword/ChangePassword.js'
import ChangePin from './modules/AccountManagement/ChangePin/ChangePin.js'
import PasswordRecovery from './modules/AccountManagement/PasswordRecovery/PasswordRecovery.js'
import PasswordRecoveryToken from './modules/AccountManagement/PasswordRecoveryToken/PasswordRecoveryToken.js'
import Container from './modules/Container.js'
import Login from './modules/Login/Login.js'
import Signup from './modules/Signup/Signup.js'

export type RouterComponentProps = {
  defaultPage: string
}
export type RouterComponentState = {
  page: string
}

export default class RouterComponent extends Component<
  RouterComponentProps,
  RouterComponentState
> {
  constructor (props: RouterComponentProps) {
    super(props)
    this.state = {
      page:
        props.defaultPage ||
        (/account/.test(window.location) ? '/account' : '/login')
    }
  }

  containerize (Component: Function) {
    return (
      <Container location={{ pathname: this.state.page }}>
        <Component history={{ push: page => this.setState({ page }) }} />
      </Container>
    )
  }

  render () {
    switch (this.state.page) {
      case '/login':
        return this.containerize(Login)
      case '/signup':
        return this.containerize(Signup)
      case '/account':
        return this.containerize(AccountManagement)
      case '/changepin':
        return this.containerize(ChangePin)
      case '/changepassword':
        return this.containerize(ChangePassword)
      case '/passwordrecovery':
        return this.containerize(PasswordRecovery)
      case '/passwordrecoverytoken':
        return this.containerize(PasswordRecoveryToken)
    }
  }
}
