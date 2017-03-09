import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import t from 'lib/web/LocaleStrings'

import { openLogin, loginPIN, openUserList, closeUserList } from './Login.action'
import { loginWithPin } from './Login.middleware'
import CachedUsers from '../CachedUsers/CachedUsers.web'
import { removeUserToLogin } from '../CachedUsers/CachedUsers.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'


import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import buttonTheme from 'theme/neutralButtons.scss'
import styles from './LoginWithPin.style.scss'
import neutral from 'theme/neutralButtonWithBlueText.scss'

class LoginWithPin extends Component {

  submit = () => {
    this.refs.pinInput.getWrappedInstance().blur()
    this.props.dispatch(
      loginWithPin(
        this.props.user,
        this.props.pin,
        ( error, account ) => {
        if (!error) {
          if (window.parent.loginCallback) {
            window.parent.loginCallback(null, account)
          }
          if (!window.parent.loginCallback) {
            this.props.dispatch(closeLoading())
            this.props.router.push('/home')
          }
        } else {
          this.refs.pinInput.getWrappedInstance().focus()
        }
      })
    )
  }
  changePin = (pin) => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    this.props.dispatch(loginPIN(pin))
    if (pin.length > 3) {
      setTimeout(this.submit, 200)
    }
  }
  viewPasswordInput = (pin) => {
    this.props.dispatch(closeUserList())
    this.props.dispatch(removeUserToLogin())
    this.props.dispatch(openLogin())
  }
  showCachedUsers = () => {
    this.props.dispatch(openUserList())
    this.refs.pinInput.getWrappedInstance().blur()
  }
  hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
  }
  toggleCachedUsers = () => {
    if (this.props.showCachedUsers) {
      this.hideCachedUsers()
    } else {
      this.showCachedUsers()
    }
  }
  componentDidUpdate (oldProps) {
    if (oldProps.showCachedUsers && !this.props.showCachedUsers) {
      this.refs.pinInput.getWrappedInstance().focus()
    }
  }
  pinStyle = () => {
    if (this.props.pin.length > 0){
      return {textAlign: 'center', fontSize: '70px', height: '80px'}
    }else{
      return {textAlign: 'center', fontSize: '35px', height: '80px'}
    }
  }

  render () {
    const cUsers = () => {
      if (this.props.showCachedUsers) {
        return (<CachedUsers blurField={this.refs.pinInput.getWrappedInstance()} />)
      } else {
        return null
      }
    }

    return (
      <div className={styles.container}>
        <Button flat className={styles.username} theme={buttonTheme} onClick={this.toggleCachedUsers}>
          { this.props.user ? this.props.user : 'No User Selected' }
        </Button>
        <div className={styles.inputDiv}>
          <Input
            ref='pinInput'
            name='pinInput'
            type='password'
            placeholder={t('fragment_landing_enter_pin')}
            style={this.pinStyle()}
            value={this.props.pin}
            onChange={this.changePin}
            autoCorrect={false}
            autoFocus
          />
        </div>
        <Button theme={neutral} className={styles.exitPin} onClick={this.viewPasswordInput}>
          { t('fragment_landing_switch_user') }
        </Button>
        {cUsers()}
      </div>
    )
  }
}


LoginWithPin = withRouter(LoginWithPin)
export default connect(state => ({

  pin: state.login.pin,
  user: state.cachedUsers.selectedUserToLogin,
  showCachedUsers: state.login.showCachedUsers

}))(LoginWithPin)

