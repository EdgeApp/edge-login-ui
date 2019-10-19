import React, { Component } from 'react'

import ChangePassword from '../connectors/AccountChangePassword.connector'
import ChangePin from '../connectors/AccountChangePin.connector'
import Home from '../connectors/AccountHome.connector'
import PasswordRecovery from '../connectors/AccountPasswordRecovery.connector'
import PasswordRecoveryToken from '../connectors/AccountPasswordRecoveryToken.connector'

export default class Account extends Component {
  componentWillMount () {
    if (window.abcui.abcAccount) {
      this.props.userLogin(window.abcui.abcAccount)
    }
  }
  render () {
    switch (this.props.page) {
      case 'home':
        return <Home {...this.props} />
      case 'pin':
        return <ChangePin {...this.props} />
      case 'password':
        return <ChangePassword {...this.props} />
      case 'recovery':
        return <PasswordRecovery {...this.props} />
      case 'token':
        return <PasswordRecoveryToken {...this.props} />
      default:
        return <Home {...this.props} />
    }
  }
}
