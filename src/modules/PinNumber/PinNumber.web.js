import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import t from '../../lib/web/LocaleStrings'
import neutralButtonWithBlueTextTheme from 'theme/neutralButtonWithBlueText'

import { changeSignupPage } from '../Signup/Signup.action'
import { changePinNumberValue } from './PinNumber.action'
import { checkPIN } from './PinNumber.middleware'

import styles from './PinNumber.webStyle'

class PinComponent extends Component {
  _handleSubmit = (e) => {
    this.props.dispatch(
     checkPIN(
        this.props.pin,
        () => this.props.dispatch(
          changeSignupPage('password')
        )
      )
    )
  }

  _handleBack = () => {
    this.props.dispatch(
      changeSignupPage('username')
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
      <div>
        <div className={styles.header}>
          <div className={styles.title}>
            <h4>{t('activity_signup_pin_label')}</h4>
          </div>
        </div>
        <div className={styles.containerBody}>
          <div className={styles.inputDiv}>
            <Input
              ref='signupPin'
              type="password"
              name="pin"
              autoFocus
              placeholder={t('activity_signup_pin_hint')}
              style={this.pinStyle()}
              onChange={this._handleOnChangeText}
              onKeyPress={this._handleKeyEnter.bind(this)}
              value={this.props.pin}
            />
          </div>
          <div className={styles.section}>
            <p className={styles.text}>{t('fragment_setup_pin_text')}</p>
          </div>
          <div className={styles.buttonSection}>
            <Button theme={neutralButtonWithBlueTextTheme} onClick={this._handleBack}>{t('string_capitalize_back')}</Button>
            <Button type="button" raised primary className={styles.buttonNext} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({

  pin: state.pin

}))(PinComponent)
