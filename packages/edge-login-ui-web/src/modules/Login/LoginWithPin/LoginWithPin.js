import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { closeLoading } from '../../Loader/Loader.action'
import {
  clearErrorLoginPinMessage,
  closeLoginUsingPin,
  closeUserList,
  loginPIN,
  openLogin,
  openUserList,
  showErrorLoginPinMessage
} from '../Login.action'
import { loginWithPin } from '../Login.middleware'
import Mobile from './LoginWithPin.mobile.js'
import Desktop from './LoginWithPin.web.js'

class LoginWithPin extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.edgeObject) {
      return nextProps.edgeObject.cancelRequest()
    }
  }
  handleSubmit = () => {
    const callback = (error, account) => {
      this.props.dispatch(loginPIN(''))
      this.props.dispatch(clearErrorLoginPinMessage())
      if (!error) {
        if (window.parent.abcui.loginCallback) {
          return window.parent.abcui.loginCallback(null, account)
        }
        if (!window.parent.abcui.loginCallback) {
          this.props.dispatch(closeLoading())
          return this.props.history.push('/account')
        }
      }
      if (error) {
        return this.props.dispatch(showErrorLoginPinMessage(error))
      }
    }
    return this.props.dispatch(
      loginWithPin(this.props.user, this.props.pin, callback)
    )
  }
  handleChangePin = pin => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    if (/^\d+$/.test(pin) || pin.length === 0) {
      this.props.dispatch(loginPIN(pin))
    }
    if (pin.length === 4) {
      setTimeout(this.handleSubmit, 200)
    }
  }
  showCachedUsers = () => {
    return this.props.dispatch(openUserList())
  }
  hideCachedUsers = () => {
    return this.props.dispatch(closeUserList())
  }
  openViewPassword = () => {
    this.props.dispatch(closeLoginUsingPin())
    return this.props.dispatch(openLogin())
  }
  render () {
    return (
      <section style={{ width: '100%' }}>
        <MediaQuery minWidth={720}>
          <Desktop
            pin={this.props.pin}
            user={this.props.user}
            error={this.props.error}
            loader={this.props.loader.loading}
            handleChangePin={this.handleChangePin}
            refPin={input => {
              this.pin = input
            }}
            showCachedUsers={this.showCachedUsers}
            hideCachedUsers={this.hideCachedUsers}
            openViewPassword={this.openViewPassword}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            pin={this.props.pin}
            user={this.props.user}
            error={this.props.error}
            loader={this.props.loader.loading}
            handleChangePin={this.handleChangePin}
            refPin={input => {
              this.pin = input
            }}
            showCachedUsers={this.showCachedUsers}
            hideCachedUsers={this.hideCachedUsers}
            openViewPassword={this.openViewPassword}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  pin: state.login.pin,
  user: state.cachedUsers.selectedUserToLogin,
  edgeObject: state.login.edgeLoginResults,
  error: state.login.errorPin,
  loader: state.loader
}))(LoginWithPin)
