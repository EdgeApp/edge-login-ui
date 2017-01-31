import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { openLogin, loginPIN, openUserList, closeUserList } from './Login.action'
import { loginWithPin } from './Login.middleware'
import CachedUsers from '../CachedUsers/CachedUsers.web'
import { removeUserToLogin } from '../CachedUsers/CachedUsers.action'
import t from 'lib/web/LocaleStrings'

import Button from 'react-toolbox/lib/button';

import Input from 'react-toolbox/lib/input';
class Login extends Component {

  submit = () => {
    this.refs.pinInput.getWrappedInstance().blur()
    this.props.dispatch(
      loginWithPin(
        this.props.user,
        this.props.pin
      , success => {
        if(success) {
          browserHistory.push('/home')
        } else {
          is.refs.pinInput.getWrappedInstance().focus()
        }
      })
    )
    this.props.dispatch(loginPIN(''))
  }
  handleViewPress = () => {
    this.refs.pinInput.getWrappedInstance().focus()
  }

  changePin = (pin) => {
    if(pin.length > 4) {
      pin = pin.substr(0,4)
    }
    this.props.dispatch(loginPIN(pin))
    if (pin.length > 3) {
      setTimeout(this.submit, 200)
    }
  }
  changePinDummy = (pinDummy) => {
    if (this.props.pinDummy.length < this.props.pin.length) {
      this.props.dispatch(loginPIN(this.props.pin.substr(0, this.props.pinDummy.length)))
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


  focusPin = () => {
    this.refs.pinDummyInput.getWrappedInstance().blur()
    this.refs.pinInput.getWrappedInstance().focus()
  }
  pinStyle = () => {
    if(this.props.pinDummy.length > 0) return {textAlign:'center',fontSize: '100px', height: '100px'}
      return {textAlign:'center',fontSize: '35px', height: '100px'}
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
      <div style={{padding: '0 0.8em',display:'flex',flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
        <Button flat neutral style={{textTransform: 'none', margin: '10px 0px'}} onClick={this.toggleCachedUsers}>
          { this.props.user ? this.props.user : 'No User Selected' }
        </Button>

        <div style={{ width: '165px', marginTop: '5px' }}>

          <Input
            type="text"
            placeholder={t('fragment_landing_enter_pin')}
            style={this.pinStyle()}
            value={this.props.pinDummy}
            autoCorrect={false}
            onChange={this.changePinDummy}
            onFocus={this.focusPin}
            ref='pinDummyInput'
          />

          <Input
            ref='pinInput'
            name="pinInput"
            type="password"
            style={{height: 0, opacity: 0, zIndex: -1, marginTop: -25}}
            value={this.props.pin}
            onChange={this.changePin}
            autoFocus
            autoCorrect={false}
          />
        </div>

        <Button flat neutral style={{margin: '10px 0px'}} onClick={this.viewPasswordInput}>
          { t('fragment_landing_switch_user') }
        </Button>
        {cUsers()}
      </div>
    )
  }
}

export default connect(state => ({

  pin: state.login.pin,
  pinDummy: state.login.pinDummy,
  user: state.cachedUsers.selectedUserToLogin,
  showCachedUsers: state.login.showCachedUsers

}))(Login)
