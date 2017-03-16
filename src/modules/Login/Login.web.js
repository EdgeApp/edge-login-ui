import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Input from 'react-toolbox/lib/input'
import Link from 'react-toolbox/lib/link'
import Button from 'react-toolbox/lib/button'
import t from 'lib/web/LocaleStrings'

import { openLogin, loginUsername, loginPassword, openUserList, closeUserList } from './Login.action'
import { loginWithPassword } from './Login.middleware'
import { openForgotPasswordModal } from '../ForgotPassword/ForgotPassword.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

import LoginWithPin from './LoginWithPin.web'
import LoginEdge from './LoginEdge.web'
import ForgotPassword from '../ForgotPassword/ForgotPassword.web'
import CachedUsers from '../CachedUsers/CachedUsers.web'
import { showWhiteOverlay } from '../Landing.action'

import signinButton from 'theme/signinButton.scss'
import neutral from 'theme/neutralButtonWithBlueText.scss'
import styles from './Login.style.scss'

class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.viewPassword) {
      this.refs.loginUsername.getWrappedInstance().blur()
      this.refs.password.getWrappedInstance().blur()
      this.props.dispatch(
        loginWithPassword(
          this.props.username,
          this.props.password,
          ( error, account ) => {
          if (!error) {
            if (window.parent.loginCallback) {
              return window.parent.loginCallback(null, account)
            }
            if (!window.parent.loginCallback) {
              this.props.dispatch(closeLoading())
              return this.props.router.push('/home')
            }
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
    if (e.charCode == 13) {
      this.refs.password.getWrappedInstance().focus()
    }
  }

  render () {

    const cUsers = () => {
      if (this.props.showCachedUsers) {
        return (<CachedUsers blurField={this.refs.loginUsername.getWrappedInstance()} />)
      } else {
        return null
      }
    }


    const inputDropdown = () => {
      return (
        <Input
          ref='loginUsername'
          label={t('fragment_landing_username_hint')}
          onChange={this._changeUsername}
          value={this.props.username}
          onFocus={this.showCachedUsers}
          onBlur={this.hideCachedUsers}
          autoCorrect={false}
          autoCapitalize={false}
          onKeyPress={this.usernameKeyPressed}
        />
      )
    }

    if (!this.props.viewPassword && this.props.viewPIN) {
      return (
        <div className={styles.container}>
          <LoginWithPin />
        </div>
      )
    }

    if(!this.props.viewPassword && !this.props.viewPIN){
      return (
        <div className={styles.container}>
          <LoginEdge />
          <div className={styles.buttonGroup}>
            <Button raised primary style={{textTransform: 'none'}} theme={signinButton} onClick={this._handleGoToSignupPage}>{t('fragment_landing_create_account')}</Button>
            <div ref='fieldsBelowView' style={{height: '45px'}} />
            <a onClick={this._handleOpenLoginWithPasswordPage}>Already have an account? Log in</a>
          </div>
          <ForgotPassword />
        </div>
      )
    }

    if(this.props.viewPassword && !this.props.viewPIN){
      return (
        <div className={styles.container}>
          <div>
            <LoginEdge />
            <div ref='fieldsView' className={styles.fieldsView}>

              <div className={styles.inputGroup}>
                <CachedUsers component={inputDropdown()} containerClassName={styles.cachedUsers} userListClassName={styles.userListClassName} />

                <form className={styles.inputs} onSubmit={e => this.handleSubmit(e)}>
                  <Input
                    type='password'
                    ref='password'
                    label={t('fragment_landing_password_hint')}
                    onChange={this.changePassword}
                    value={this.props.password}
                    autoCorrect={false}
                    autoCapitalize={false}
                  />
                </form>
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <Button raised primary style={{textTransform: 'none'}} theme={signinButton} onClick={this.handleSubmit}>{t('fragment_landing_signin_button')}</Button>
              <br />
              <Button theme={neutral} style={{textTransform: 'none'}} onClick={this._handleGoToSignupPage}>{t('fragment_landing_create_a_new_account')}</Button>
              <br />
              <a onClick={this._handleOpenForgotPasswordModal} className={styles.forgotPassword}>{t('fragment_landing_forgot_password')}</a>
            </div>
          </div>
          <ForgotPassword />
        </div>
      )
    }

  }
}

Login = withRouter(Login)
export default connect(state => ({

  viewPIN: state.login.viewPIN,
  viewPassword: state.login.viewPassword,
  username: state.login.username,
  password: state.login.password,
  showCachedUsers: state.login.showCachedUsers

}))(Login)
