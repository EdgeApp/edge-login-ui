import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  openLogin,
  openLoginUsingPin,
  closeLoginUsingPin,
  closeLogin,
  loginUsername,
  loginPassword,
  openUserList,
  closeUserList,
  hideLoginNotification,
  showErrorLoginMessage,
  clearErrorLoginMessage
} from './Login.action'
import { loginWithPassword } from './Login.middleware'
import { openForgotPasswordModal } from '../ForgotPassword/ForgotPassword.action'
import { closeLoading } from '../Loader/Loader.action'

import LoginEdge from './Components/LoginEdge.web'
import NewAccountSection from './Components/NewAccount.web.js'
import LoginWithPasswordSection from './Components/LoginWithPassword.web.js'
import LoginWithPinSection from './Components/LoginWithPin.web.js'
import Divider from './Components/Divider.web.js'

import styles from './Login.style.scss'

class Login extends Component {
  _handleSubmit = (username, password) => {
    const callback = (error, account) => {
      if (!error) {
        const abcuiCallback = window.parent.abcui
        this.props.dispatch(clearErrorLoginMessage(error))
        if (abcuiCallback.loginCallback) {
          if (this.props.edgeObject) {
            this.props.edgeObject.cancelRequest()
          }
          return abcuiCallback.loginCallback(null, account)
        }
        if (!abcuiCallback.loginCallback) {
          this.props.dispatch(closeLoading())
          return this.props.router.push('/account')
        }
      }
      if (error) {
        return this.props.dispatch(showErrorLoginMessage(error))
      }
    }
    if (this.props.viewPassword) {
      this.props.dispatch(
        loginWithPassword(
          this.props.username,
          this.props.password,
          callback
        )
      )
    } else {
      this.props.dispatch(openLogin())
    }
  }

  _handleGoToSignupPage = () => {
    this.props.router.push('/signup')
  }
  _handleOpenLoginWithPasswordPage = () => {
    this.props.dispatch(openLogin())
  }
  _handleOpenForgotPasswordModal = () => {
    this.props.dispatch(openForgotPasswordModal())
  }
  _changeUsername = (username) => {
    this.props.dispatch(loginUsername(username))
  }
  changePassword = (password) => {
    this.props.dispatch(loginPassword(password))
  }
  showCachedUsers = () => {
    this.props.dispatch(openUserList())
  }
  hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
  }
  openViewPin = () => {
    this.props.dispatch(openLoginUsingPin())
    this.props.dispatch(closeLogin())
  }
  openViewPassword = () => {
    this.props.dispatch(closeLoginUsingPin())
    this.props.dispatch(openLogin())
  }
  handleViewPress () {
    this.props.dispatch(closeUserList())
  }
  usernameKeyPressed = (e) => {
    if (e.charCode === 13) {
      this.refs.password.getWrappedInstance().focus()
    }
  }

  _handleNotificationClose = () => {
    return this.props.dispatch(hideLoginNotification())
  }

  _gotoPasswordInput = (pin) => {
    this.props.dispatch(closeUserList())
    this.props.dispatch(openLogin())
  }

  render () {
    if (!this.props.viewPassword && !this.props.viewPIN) {
      return (
        <div className={styles.container}>
          <LoginEdge />
          <Divider />
          <NewAccountSection signup={this._handleGoToSignupPage} login={this._handleOpenLoginWithPasswordPage} />
        </div>
      )
    }
    if (!this.props.viewPIN && this.props.viewPassword) {
      return (
        <div className={styles.container}>
          <LoginEdge />
          <Divider />
          <LoginWithPasswordSection login={this._handleSubmit} signup={this._handleGoToSignupPage} />
        </div>
      )
    }
    if (this.props.viewPIN && !this.props.viewPassword) {
      return (
        <div className={styles.container}>
          <LoginWithPinSection openViewPassword={this.openViewPassword} router={this.props.router} />
        </div>
      )
    }
  }
}

const LoginWithRouter = withRouter(Login)
const LoginWithRedux = connect(state => ({
  viewPIN: state.login.viewPIN,
  viewPassword: state.login.viewPassword,
  username: state.login.username,
  password: state.login.password,
  loginNotification: state.login.loginNotification,
  showCachedUsers: state.login.showCachedUsers,
  edgeObject: state.login.edgeLoginResults,
  loginPasswordWait: state.login.loginPasswordWait,
  currentPinCountdown: false
}))(LoginWithRouter)

export default LoginWithRedux
