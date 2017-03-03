import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { openLogin, loginUsername, loginPassword, openUserList, closeUserList } from './Login.action'
import { loginWithPassword } from './Login.middleware'
import { openForgotPasswordModal } from '../ForgotPassword/ForgotPassword.action'

import t from 'lib/web/LocaleStrings'
import CachedUsers from '../CachedUsers/CachedUsers.web'
import { showWhiteOverlay } from '../Landing.action'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import Link from 'react-toolbox/lib/link'

import LoginWithPin from './LoginWithPin.web'
import signinButton from 'theme/signinButton.scss'
import loginUsernameInput from 'theme/loginUsernameInput.scss'
import LoginEdge from './LoginEdge.web'
import ForgotPassword from '../ForgotPassword/ForgotPassword.web'

class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.viewPassword) {
      this.refs.loginUsername.getWrappedInstance().blur()
      this.refs.password.getWrappedInstance().blur()
      this.props.dispatch(loginWithPassword(
        this.props.username,
        this.props.password,
        ( error, account) => {
        if (!error) {
          if (window.parent.loginCallback) {
            window.parent.loginCallback(null, account)
          }
        }
      }))
    } else {
      this.props.dispatch(openLogin())
      // this.refs.fieldsView.transitionTo({opacity: 1, height: 90}, 200)
      // this.refs.fieldsBelowView.transitionTo({height: 0}, 200)
    }
  }
  handleSignup = () => {
    this.props.dispatch(showWhiteOverlay())
    this.props.router.push('/signup')
  }
  changeUsername = (username) => {
    this.props.dispatch(loginUsername(username))
  }
  changePassword = (password) => {
    this.props.dispatch(loginPassword(password))
  }
  usernameFocused = () => {
    this.showCachedUsers()
  }
  passwordFocused = () => {
    this.hideCachedUsers()
  }
  showCachedUsers = () => {
    this.props.dispatch(openUserList())
  }
  hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
  }
  renderWhiteTransition () {
    if (this.props.whiteOverlayVisible) {
      return (<div ref='whiteOverlay' style={style.whiteTransitionFade} />)
    } else {
      return null
    }
  }
  handleViewPress () {
    this.props.dispatch(closeUserList())
  }
  _handleOpenForgotPasswordModal = () => {
    this.props.dispatch(openForgotPasswordModal())
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
    let heightBelowView = '90px'
    let heightFieldsView = 0
    let opacityFieldsView = 0
    if (this.props.viewPassword) {
      heightBelowView = 0
      heightFieldsView = '90px'
      opacityFieldsView = 1
    }
    if (this.props.viewPIN) {
      return (<LoginWithPin />)
    }
    return (
      <div style={style.container}>
        <LoginEdge />
        <ForgotPassword />
        <div style={style.form}>

          <div ref='fieldsView' style={{
              padding: '0 0.4em',
              flex: 1,
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: opacityFieldsView,
              height: heightFieldsView
            }}>

            <Input
              theme={loginUsernameInput}
              ref='loginUsername'
              placeholder={t('fragment_landing_username_hint')}
              onChange={this.changeUsername}
              value={this.props.username}
              onFocus={this.usernameFocused}
              autoCorrect={false}
              autoCapitalize={false}
              onKeyPress={this.usernameKeyPressed}
            />

            <form onSubmit={e => this.handleSubmit(e)}>
              <Input
                type='password'
                ref='password'
                onFocus={this.passwordFocused}
                placeholder={t('fragment_landing_password_hint')}
                onChange={this.changePassword}
                value={this.props.password}
                autoCorrect={false}
                autoCapitalize={false}
              />
            </form>
            {cUsers()}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
            <Link onClick={this._handleOpenForgotPasswordModal} label="Forgot Password" />
            <Button style={{margin: '30px 0px 0px 0px'}} raised onClick={this.handleSubmit}>{t('fragment_landing_signin_button')}</Button>
            <div ref='fieldsBelowView' style={{height: heightBelowView}} />
            <Button onClick={this.handleSignup} style={{margin: '20px 0px'}} theme={signinButton} primary raised>{t('fragment_landing_signup_button')}</Button>
          </div>
        </div>
      </div>
    )
  }
}

const style = {

  container: {
    padding: '0 0.4em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  form: {
    flex: 1
  },
  whiteTransitionFade: {
    position: 'absolute',
    backgroundColor: '#FFF',
    opacity: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  fieldsView: {

  }
}

Login = withRouter(Login)
export default connect(state => ({

  username: state.login.username,
  password: state.login.password,
  viewPassword: state.login.viewPassword,
  whiteOverlayVisible: state.whiteOverlayVisible,
  showCachedUsers: state.login.showCachedUsers,
  viewPIN: state.login.viewPIN

}))(Login)
