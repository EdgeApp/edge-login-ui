import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import Input from 'react-toolbox/lib/input'

import { changeSignupPage } from '../Signup/Signup.action'
import { changePinNumberValue, error, clearError } from './PinNumber.action'
import { checkPIN } from './PinNumber.middleware'

import styles from './PinNumber.mobileStyle.scss'

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
        <Input
          autoFocus
          type='password'
          name='pin'
          placeholder={t('activity_signup_pin_hint')}
          onChange={this._handleOnChangeText}
          onKeyPress={this._handleKeyEnter.bind(this)}
          value={this.props.pin}
          error={this.props.error}
          className={this.props.pin.length > 0 ? styles.inputed : styles.input}
        />
        <p className={styles.text}>Your PIN is a 4 digit code used to do quick re-logins into your account</p>
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={this._handleSubmit}>Next</button>
          <button className={styles.secondaryMobile} onClick={e => this.props.dispatch(changeSignupPage('username'))}>Back</button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  pin: state.pin.pin,
  error: state.pin.error
}))(Pin)
