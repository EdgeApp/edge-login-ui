import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// import Input from 'react-toolbox/lib/input'
// import Button from 'react-toolbox/lib/button'
import t from 'lib/web/LocaleStrings'
// import { sprintf } from 'sprintf-js'

import { openLogin, openLoginUsingPin, closeLoginUsingPin, closeLogin, loginUsername, loginPassword, openUserList, closeUserList, hideLoginNotification } from './Login.action'
import { loginWithPassword } from './Login.middleware'
import { openForgotPasswordModal } from '../ForgotPassword/ForgotPassword.action'
import { closeLoading } from '../Loader/Loader.action'

// import LoginWithPin from './LoginWithPin.web'
// import ForgotPassword from '../ForgotPassword/ForgotPassword.web'
// import CachedUsers from '../CachedUsers/CachedUsers.web'
import Snackbar from 'react-toolbox/lib/snackbar'
import LoginEdge from './Components/LoginEdge.web'
import NewAccountSection from './Components/NewAccount.web.js'
import LoginWithPasswordSection from './Components/LoginWithPassword.web.js'
import LoginWithPinSection from './Components/LoginWithPin.web.js'
import Divider from './Components/Divider.web.js'

// import signinButton from 'theme/signinButton.scss'
// import neutral from 'theme/neutralButtonWithBlueText.scss'
import styles from './Login.style.scss'
// import buttons from '../../theme/buttons.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPasswordCountdown: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.viewPassword) {
      this.refs.loginUsername.getWrappedInstance().blur()
      this.refs.password.getWrappedInstance().blur()
      this.props.dispatch(
        loginWithPassword(
          this.props.username,
          this.props.password,
          (error, account) => {
            if (!error) {
              if (window.parent.loginCallback) {
                if (this.props.edgeObject) {
                  this.props.edgeObject.cancelRequest()
                }
                return window.parent.loginCallback(null, account)
              }
              if (!window.parent.loginCallback) {
                this.props.dispatch(closeLoading())
                return this.props.router.push('/home')
              }
            } else {
            // this.props._renderNotification('There has been an error logging in.')
            }
          })
      )
    } else {
      this.props.dispatch(openLogin())
      // this.refs.fieldsView.transitionTo({opacity: 1, height: 90}, 200)
      // this.refs.fieldsBelowView.transitionTo({height: 0}, 200)
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
  // renderWhiteTransition () {
  //   if (this.props.whiteOverlayVisible) {
  //     return (<div ref='whiteOverlay' style={style.whiteTransitionFade} />)
  //   } else {
  //     return null
  //   }
  // }
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

  // render () {
  //   const inputDropdown = () => {
  //     return (
  //       <Input
  //         ref='loginUsername'
  //         label={t('fragment_landing_username_hint')}
  //         onChange={this._changeUsername}
  //         value={this.props.username}
  //         onFocus={this.showCachedUsers}
  //         onBlur={this.hideCachedUsers}
  //         autoCorrect={false}
  //         autoCapitalize={false}
  //         onKeyPress={this.usernameKeyPressed}
  //       />
  //     )
  //   }
  //
  //   if (!this.props.viewPassword && this.props.viewPIN) {
  //     return (
  //       <div className={styles.container}>
  //         <LoginWithPin />
  //         {this._renderNotification()}
  //       </div>
  //     )
  //   }
  //
  //   if (!this.props.viewPassword && !this.props.viewPIN) {
  //     return (
  //       <div className={styles.container}>
  //         <LoginEdge />
  //         <div className={styles.buttonGroup}>
  //           <Button raised primary style={{textTransform: 'none', marginLeft: '0px'}} theme={signinButton} onClick={this._handleGoToSignupPage}>{t('fragment_landing_create_account')}</Button>
  //           <div ref='fieldsBelowView' style={{height: '45px'}} />
  //           <a onClick={this._handleOpenLoginWithPasswordPage}>Already have an account?<br />Log in</a>
  //         </div>
  //         <ForgotPassword />
  //         {this._renderNotification()}
  //       </div>
  //     )
  //   }
  //
  //   if (this.props.viewPassword && !this.props.viewPIN) {
  //     return (
  //       <div className={styles.container}>
  //         <div>
  //           <LoginEdge />
  //           <div ref='fieldsView' className={styles.fieldsView}>
  //
  //             <div className={styles.inputGroup}>
  //               <CachedUsers component={inputDropdown()} area="passwordLogin" containerClassName={styles.cachedUsers} userListClassName={styles.userListClassName} />
  //
  //               <form className={styles.inputs} onSubmit={e => this.handleSubmit(e)}>
  //                 <Input
  //                   type='password'
  //                   ref='password'
  //                   label={t('fragment_landing_password_hint')}
  //                   onChange={this.changePassword}
  //                   value={this.props.password}
  //                   autoCorrect={false}
  //                   autoCapitalize={false}
  //                 />
  //               </form>
  //             </div>
  //           </div>
  //           <div className={styles.buttonGroup}>
  //             <span className={styles.loginTimeout}>{this.props.loginPasswordWait ? sprintf(t('server_error_invalid_pin_wait'), this.props.loginPasswordWait) : ''}</span>
  //             <Button raised primary style={{textTransform: 'none'}} theme={signinButton} onClick={this.handleSubmit} disabled={this.props.loginPasswordWait > 0}>{t('fragment_landing_signin_button')}</Button>
  //             <br />
  //             <Button theme={neutral} className={styles.createNewButton} onClick={this._handleGoToSignupPage}>{t('fragment_landing_create_a_new_account')}</Button>
  //             <br />
  //             <Button theme={neutral} style={{textTransform: 'none'}} onClick={this._handleOpenForgotPasswordModal} className={styles.forgotPassword}>{t('fragment_landing_forgot_password')}</Button>
  //           </div>
  //         </div>
  //         <ForgotPassword />
  //         {this._renderNotification()}
  //       </div>
  //     )
  //   }
  // }

  render () {
    if (this.props.viewPIN) {
      return (
        <div className={styles.container}>
          <LoginWithPinSection openViewPassword={this.openViewPassword}/>
        </div>
      )
    }
    if (!this.props.viewPIN) {
      return (
        <div className={styles.container}>
          <LoginEdge />
          <Divider />
          { this.props.viewPassword ? <LoginWithPasswordSection openViewPin={this.openViewPin}/> : <NewAccountSection signup={this._handleGoToSignupPage} login={this._handleOpenLoginWithPasswordPage} /> }
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
