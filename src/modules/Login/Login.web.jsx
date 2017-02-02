import React, { Component } from 'react'
import { connect } from 'react-redux'

import { browserHistory } from 'react-router'
import { openLogin, loginUsername, loginPassword, openUserList, closeUserList } from './Login.action'
import { loginWithPassword } from './Login.middleware'
import t from 'lib/web/LocaleStrings'
import CachedUsers from '../CachedUsers/CachedUsers.web'
import { showWhiteOverlay } from '../Landing.action'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import LoginWithPin from './LoginWithPin.web'
import signinButton from 'theme/signinButton.scss'
import loginUsernameInput from 'theme/loginUsernameInput.scss'

class Login extends Component {

  submit = () => {
    if (this.props.viewPassword) {
      this.refs.loginUsername.getWrappedInstance().blur()
      this.refs.password.getWrappedInstance().blur()
      this.props.dispatch(loginWithPassword(this.props.username, this.props.password, success => {
        if (success) browserHistory.push('/home')
      }))
    } else {
      this.props.dispatch(openLogin())
      console.log(this.refs.fieldsView)
      // this.refs.fieldsView.transitionTo({opacity: 1, height: 90}, 200)
      // this.refs.fieldsBelowView.transitionTo({height: 0}, 200)
    }
  }

  handleSignup = () => {
    this.props.dispatch(showWhiteOverlay())
    browserHistory.push('/signup/username')
  }
  changeUsername = (username) => {
    this.props.dispatch(loginUsername(username))
  }

  changePassword = (password) => {
    this.props.dispatch(loginPassword(password))
  }
  usernameFocused = () => {
    this.showCachedUsers()
    this.refs.titleText.style.height = 0
    this.refs.titleText.style.margin = 0
  }
  passwordFocused = () => {
    this.hideCachedUsers()
    this.refs.titleText.style.height = 0
    this.refs.titleText.style.margin = 0
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
        <div style={style.form}>
          <div ref='titleText' style={{textAlign: 'center', fontSize: '30px', padding: '0 0.8em', overflow: 'hidden', margin: '10px'}}>{t('activity_splash_with_airbitz')}</div>

          <div ref='fieldsView' style={{
            padding: '0 0.8em',
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
        />

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

            {cUsers()}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
            <Button theme={signinButton} style={{margin: '30px 0px 0px 0px'}} raised onClick={this.submit}>{t('fragment_landing_signin_button')}</Button>
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
    padding: '0 0.4em'
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
export default connect(state => ({

  username: state.login.username,
  password: state.login.password,
  viewPassword: state.login.viewPassword,
  whiteOverlayVisible: state.whiteOverlayVisible,
  showCachedUsers: state.login.showCachedUsers,
  viewPIN: state.login.viewPIN

}))(Login)
