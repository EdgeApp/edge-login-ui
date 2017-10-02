import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import t from 'lib/web/LocaleStrings'

import {
  openLogin,
  openLoginUsingPin,
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

import Snackbar from 'react-toolbox/lib/snackbar'
import LoginEdge from './Components/LoginEdge.mobile.js'
import LoginWithPassword from './Components/LoginWithPassword.mobile.js'
import NewAccount from './Components/NewAccount.mobile.js'
import LoginWithPin from './Components/LoginWithPin.mobile.js'

// import styles from './Login.mobileStyle.scss'

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

  _renderNotification = (errorString) => {
    const { loginNotification } = this.props
    return <Snackbar
      action='Dismiss'
      active={loginNotification}
      label={t(errorString)}
      timeout={5000}
      type='accept'
      onClick={this._handleNotificationClose}
      onTimeout={this._handleNotificationClose} />
  }

  _gotoPasswordInput = (pin) => {
    this.props.dispatch(closeUserList())
    this.props.dispatch(openLogin())
  }
  render () {
    if (!this.props.viewPassword && !this.props.viewPIN) {
      return <NewAccount />
    }
    if (!this.props.viewPIN && this.props.viewPassword) {
      if (this.props.mobileLoginView) {
        return <LoginEdge history={this.props.history} />
      }
      if (!this.props.mobileLoginView) {
        return <LoginWithPassword history={this.props.history} login={this._handleSubmit} signup={this._handleGoToSignupPage} />
      }
    }
    if (this.props.viewPIN && !this.props.viewPassword) {
      return <LoginWithPin history={this.props.history} />
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
  mobileLoginView: state.login.mobileLoginView,
  currentPinCountdown: false
}))(LoginWithRouter)

export default LoginWithRedux
