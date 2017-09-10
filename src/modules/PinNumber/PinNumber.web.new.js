import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'

import { changeSignupPage } from '../Signup/Signup.action'
import { changePinNumberValue, error, clearError } from './PinNumber.action'
import { checkPIN } from './PinNumber.middleware'

import styles from './PinNumber.webStyle.scss'
import Input from 'react-toolbox/lib/input'

class Pin extends Component {
  _handleSubmit = (e) => {
    this.props.dispatch(
      checkPIN(
        this.props.pin,
        (errorMessage) => {
          if (errorMessage) {
            return this.props.dispatch(error(errorMessage))
          }
          if (!errorMessage) {
            this.props.dispatch(clearError())
            return this.props.dispatch(changeSignupPage('password'))
          }
        }
      )
    )
  }
  _handleOnChangeText = (pin) => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    if (/^\d+$/.test(pin) || pin.length === 0) {
      this.props.dispatch(
        changePinNumberValue(pin)
      )
    }
    if (pin.length > 3) {
      setTimeout(this._handleSubmit, 200)
    }
  }
  pinStyle = () => {
    if (this.props.pin.length > 0) {
      return {textAlign: 'center', fontSize: '70px', height: '80px'}
    } else {
      return {textAlign: 'center', fontSize: '35px', height: '80px'}
    }
  }
  _handleKeyEnter = (e) => {
    if (e.nativeEvent.charCode === 13) {
      return this._handleSubmit()
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Choose a 4 Digit PIN</p>
        <div className={styles.password}>
          <Input
            autoFocus
            type='password'
            name='pin'
            placeholder={t('activity_signup_pin_hint')}
            style={this.pinStyle()}
            onChange={this._handleOnChangeText}
            onKeyPress={this._handleKeyEnter.bind(this)}
            value={this.props.pin}
            error={this.props.error}
            className={styles.input}
          />
        </div>
        <p className={styles.bullet}>Your PIN is a 4 digit code used to do quick re-logins into your account</p>
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={e => this.props.dispatch(changeSignupPage('username'))}>Back</button>
          <button className={styles.primary} onClick={this._handleSubmit}>Next</button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  pin: state.pin.pin,
  error: state.pin.error
}))(Pin)
