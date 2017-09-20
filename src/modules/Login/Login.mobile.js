import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import t from 'lib/web/LocaleStrings'

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

import Snackbar from 'react-toolbox/lib/snackbar'
// import LoginEdge from './Components/LoginEdge.web'
// import NewAccountSection from './Components/NewAccount.web.js'
// import LoginWithPasswordSection from './Components/LoginWithPassword.web.js'
// import LoginWithPinSection from './Components/LoginWithPin.web.js'
// import Divider from './Components/Divider.web.js'

import styles from './Login.mobileStyle.scss'

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
    return (
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.edge}>
            <p className={styles.text}>
              Edge Login
            </p>
          </div>
          <div className={styles.username}>
            <p className={styles.text}>
              Username Login
            </p>
          </div>
        </div>
        <div className={styles.rectangle}>
          <p className={styles.text}>
            Tap to login with the Airbitz mobile wallet
          </p>
        </div>
        <p className={styles.showQRText}>
          Show QR code
        </p>
        <div className={styles.divider} />
        <div className={styles.signUp}>
          <p className={styles.question}>
            Don’t have an account?
          </p>
          <p className={styles.create}>
            Create account
          </p>
        </div>
        <div className={styles.divider} />
        <p className={styles.appText}>
          Increase your Account Security. <br />
          Download Airbitz & enable 2FA
        </p>
      </div>
    )
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
