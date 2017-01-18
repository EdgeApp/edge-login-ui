import React, { Component } from 'react'
import { connect } from 'react-redux'

import { browserHistory } from 'react-router'
import { openLogin, loginUsername, loginPassword, openUserList, closeUserList } from './Login.action'
import { loginWithPassword } from './Login.middleware'
import t from 'lib/web/LocaleStrings'
import CachedUsers from '../CachedUsers/CachedUsers.web'
import { showWhiteOverlay } from '../Landing.action'
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Loader from '../Loader/Loader.web'
import ErrorModal from '../ErrorModal/ErrorModal.web'

import signinButton from 'theme/signinButton.scss';
import skipButton from 'theme/skipButton.scss';
class Login extends Component {

  submit = () => {
    if (this.props.viewPassword) {
      this.refs.loginUsername.getWrappedInstance().blur()
      this.refs.password.getWrappedInstance().blur()
      this.props.dispatch(loginWithPassword(this.props.username, this.props.password, success => {
        if(success) browserHistory.push('/home')
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
    console.log('ok',username)
    this.props.dispatch(loginUsername(username))
  }

  changePassword = (password) => {
    this.props.dispatch(loginPassword(password))
  }
  usernameFocused = () => {
    this.showCachedUsers()
    console.log(this.refs.titleText)
    // this.refs.titleText.transitionTo({height: 0}, 200)
  }
  passwordFocused = () => {
    this.hideCachedUsers()
    console.log(this.refs.titleText)

    // this.refs.titleText.transitionTo({height: 0}, 200)
  }

  showCachedUsers = () => {
    this.props.dispatch(openUserList())
  }

  hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
  }

  renderWhiteTransition () {
    if (this.props.whiteOverlayVisible) {
      return (<div ref='whiteOverlay' style={style.whiteTransitionFade}></div>)
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
        return (<CachedUsers blurField={this.refs.loginUsername} />)
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

    return (
      <div style={style.container}>
        <Card style={style.form}>
          <CardTitle ref='titleText' style={{height: 40}}>
            <div style={style.textTitle}>{t('activity_splash_with_airbitz')}</div>
          </CardTitle>
          <CardText ref='fieldsView' style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: opacityFieldsView, 
                height: heightFieldsView
              }}>
            <Input
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
          </CardText>
          <CardActions style={{display:'flex',flexDirection:'column',alignItems:'stretch'}}>
            <Button theme={signinButton} style={{margin: '0px 0px 10px 0px'}} raised onClick={this.submit}>{t('fragment_landing_signin_button')}</Button>
            <div ref='fieldsBelowView' style={{height: heightBelowView}}></div>
            <Button onClick={this.handleSignup} style={{margin: 0}} theme={signinButton} primary raised>{t('fragment_landing_signup_button')}</Button>
          </CardActions>
        </Card>
        <Loader/>
        <ErrorModal/>
        {cUsers()}
      </div>
    )
  }
}


const style = {


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
  pin: state.login.pin

}))(Login)
