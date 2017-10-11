import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  loginUsername,
  loginPassword,
  openUserList,
  closeUserList,
  showErrorLoginMessage,
  clearErrorLoginMessage
} from '../Login.action'
import { loginWithPassword } from '../Login.middleware'
import { closeLoading } from '../../Loader/Loader.action'

import Desktop from './LoginWithPassword.web.js'

class LoginWithPassword extends Component {
  handleSubmit = () => {
    const { username, password } = this.props
    const abcuiCallback = window.parent.abcui
    this.props.dispatch(clearErrorLoginMessage())
    const callback = (error, account) => {
      if (!error) {
        if (abcuiCallback.loginCallback) {
          if (this.props.edgeObject) {
            this.props.edgeObject.cancelRequest()
          }
          return abcuiCallback.loginCallback(null, account)
        }
        if (!abcuiCallback.loginCallback) {
          this.props.dispatch(closeLoading())
          return this.props.history.push('/account')
        }
      }
      if (error) {
        return this.props.dispatch(showErrorLoginMessage(error))
      }
    }
    return this.props.dispatch(
      loginWithPassword(
        username,
        password,
        callback
      )
    )
  }
  goToSignupPage = () => {
    return this.props.history.push('/signup')
  }
  usernameKeyPress = (e) => {
    if (e.charCode === 13) {
      return this.password.getWrappedInstance().focus()
    }
  }
  passwordKeyPress = (e) => {
    if (e.charCode === 13) {
      if (!this.props.loader.loading) {
        return this._handleSubmit()
      }
    }
  }
  showCachedUsers = () => {
    return this.props.dispatch(openUserList())
  }
  hideCachedUsers = () => {
    return this.props.dispatch(closeUserList())
  }
  changeUsernameValue = (value) => {
    return this.props.dispatch(loginUsername(value))
  }
  changePasswordValue = (value) => {
    return this.props.dispatch(loginPassword(value))
  }
  render () {
    return (
      <Desktop
        submit={this.handleSubmit}
        goToSignupPage={this.goToSignupPage}
        hideCachedUsers={this.hideCachedUsers}
        showCachedUsers={this.showCachedUsers}
        passwordKeyPress={this.passwordKeyPress}
        usernameKeyPress={this.usernameKeyPress}
        changeUsernameValue={this.changeUsernameValue}
        changePasswordValue={this.changePasswordValue}
        refUsername={input => { this.username = input }}
        refPassword={input => { this.password = input }}
        username={this.props.username}
        password={this.props.password}
        loader={this.props.loader.loading}
        error={this.props.error}
      />
    )
  }
}

export default connect(state => ({
  username: state.login.username,
  password: state.login.password,
  loader: state.loader,
  error: state.login.error
}))(LoginWithPassword)
