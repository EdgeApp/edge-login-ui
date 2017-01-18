import React, { Component } from 'react'
import { connect } from 'react-redux'

import { openLogin, loginPIN, openUserList, closeUserList } from './Login.action'
import { loginWithPin } from './Login.middleware'
import CachedUsers from '../CachedUsers/CachedUsers.web'
import { removeUserToLogin } from '../CachedUsers/CachedUsers.action'
import t from '../../lib/LocaleStrings'

class Login extends Component {

  submit = () => {
    this.refs.pinInput.getWrappedInstance().blur()
    this.props.dispatch(
      loginWithPin(
        this.props.user,
        this.props.pin
      )
    )
    this.props.dispatch(loginPIN(''))
  }
  handleViewPress = () => {
    this.refs.pinInput.getWrappedInstance().focus()
  }

  changePin = (pin) => {
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
    this.refs.pinDummyInput.blur()
    this.refs.pinInput.focus()
  }
  pinStyle = () => {

    if(this.props.pinDummy.length > 0) {
      return {fontSize: 110, paddingTop: 20, paddingBottom: -20, padding: 0, marginHorizontal: 10, height: 50, marginVertical: 0, fontSize: 28, textAlign: 'center' }
    } else {
      return { padding: 0, marginHorizontal: 10, height: 50, marginVertical: 0, fontSize: 28, textAlign: 'center' }
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
      <div style={{padding: '0 0.8em'}}>
        <Button style={{backgroundColor: 'transparent'}} onPress={this.toggleCachedUsers}>
          <Text style={{ color: 'skyblue', fontSize: 18, marginTop: 10 } }>{ this.props.user ? this.props.user : 'No User Selected' }</Text>
        </Button>

        <div style={{ width: 165, marginTop: 5 }}>
          

          <Input
            ref='pinInput'
            name="pinInput"
            type="password"
            style={{height: 0, opacity: 0}}
            value={this.props.pin}
            onChange={this.changePin}
            autoFocus
            maxLength={4}
            autoCorrect={false}
            keyboardType='numeric'
          />
          
          <Input
            type="text"
            placeholder={t('fragment_landing_enter_pin')}
            style={this.pinStyle()}
            value={this.props.pinDummy}
            maxLength={4}
            autoCorrect={false}
            onChange={this.changePinDummy}
            onFocus={this.focusPin}
            ref='pinDummyInput'
        />
        </div>

        <Button style={{padding: 15, backgroundColor: 'transparent'}} onClick={this.viewPasswordInput}>
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
