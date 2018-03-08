import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { closeLoading } from '../../Loader/Loader.action'
import { openForgotPasswordModal } from '../../Modals/ForgotPassword/ForgotPassword.action.js'
import ForgotPassword from '../../Modals/ForgotPassword/ForgotPassword.js'
import {
  clearErrorLoginMessage,
  closeUserList,
  loginPassword,
  loginUsername,
  openUserList,
  showErrorLoginMessage,
  showMobileLoginEdgeView
} from '../Login.action'
import { loginWithPassword } from '../Login.middleware'
import Mobile from './LoginWithPassword.mobile.js'
import Desktop from './LoginWithPassword.web.js'
import webStyle from './LoginWithPassword.webStyle.scss'

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
    return this.props.dispatch(loginWithPassword(username, password, callback))
  }
  goToSignupPage = () => {
    return this.props.history.push('/signup')
  }
  usernameKeyPress = e => {
    if (e.charCode === 13) {
      return this.password.getWrappedInstance().focus()
    }
  }
  passwordKeyPress = e => {
    if (e.charCode === 13) {
      if (!this.props.loader.loading) {
        return this.handleSubmit()
      }
    }
  }
  toggleMobileLoginView = e => {
    return this.props.dispatch(showMobileLoginEdgeView())
  }
  showCachedUsers = () => {
    return this.props.dispatch(openUserList())
  }
  hideCachedUsers = () => {
    return this.props.dispatch(closeUserList())
  }
  changeUsernameValue = value => {
    return this.props.dispatch(loginUsername(value))
  }
  changePasswordValue = value => {
    return this.props.dispatch(loginPassword(value))
  }
  toggleForgotPassword = () => {
    return this.props.dispatch(openForgotPasswordModal())
  }
  render () {
    return (
      <section className={webStyle.rootContainer}>
        <MediaQuery minWidth={720}>
          <Desktop
            submit={this.handleSubmit}
            goToSignupPage={this.goToSignupPage}
            hideCachedUsers={this.hideCachedUsers}
            showCachedUsers={this.showCachedUsers}
            passwordKeyPress={this.passwordKeyPress}
            usernameKeyPress={this.usernameKeyPress}
            changeUsernameValue={this.changeUsernameValue}
            changePasswordValue={this.changePasswordValue}
            toggleForgotPassword={this.toggleForgotPassword}
            refUsername={input => {
              this.username = input
            }}
            refPassword={input => {
              this.password = input
            }}
            username={this.props.username}
            password={this.props.password}
            loader={this.props.loader.loading}
            error={this.props.error}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            submit={this.handleSubmit}
            goToSignupPage={this.goToSignupPage}
            hideCachedUsers={this.hideCachedUsers}
            showCachedUsers={this.showCachedUsers}
            passwordKeyPress={this.passwordKeyPress}
            usernameKeyPress={this.usernameKeyPress}
            changeUsernameValue={this.changeUsernameValue}
            changePasswordValue={this.changePasswordValue}
            toggleForgotPassword={this.toggleForgotPassword}
            toggleMobileLoginView={this.toggleMobileLoginView}
            refUsername={input => {
              this.username = input
            }}
            refPassword={input => {
              this.password = input
            }}
            username={this.props.username}
            password={this.props.password}
            loader={this.props.loader.loading}
            error={this.props.error}
          />
        </MediaQuery>
        <ForgotPassword />
      </section>
    )
  }
}

export default connect(state => ({
  username: state.login.username,
  password: state.login.password,
  loader: state.loader,
  error: state.login.error
}))(LoginWithPassword)
