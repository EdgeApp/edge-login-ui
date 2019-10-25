import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/SignupPinNumber.scss'
import PinInput from './ComponentPinInput'
import NavigationButtons from './LayoutNavigationButtons'

export default class SignupPin extends Component {
  handleSubmit = pin => {
    this.props.handleSubmit(pin, error => {
      if (error) {
        return this.props.handleError(error)
      }
      return this.props.openPasswordScreen()
    })
  }

  handleChangePin = e => {
    const pin = e.target.value
    // Cut PIN to 4when PIN is greater than 4
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    // Change pin only when input is numbers
    if (/^\d+$/.test(pin) || pin.length === 0) {
      this.props.changePinNumberValue(pin)
    }
    // Auto submit PIN when length is at 4
    if (pin.length > 3) {
      this.handleSubmit(pin)
    }
  }

  componentDidMount() {
    this.props.changePinNumberValue('')
  }

  render() {
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>{t('signup_welcome')}</p>
          <p className={styles.subHeaderText}>{t('signup_pin_header')}</p>
          <form className={styles.form}>
            <PinInput
              handleChangePin={this.handleChangePin}
              pin={this.props.pin}
            />
          </form>
          <p className={styles.text}>{t('signup_pin_text')}</p>
          <NavigationButtons
            onLeftClick={this.props.openUsernameScreen}
            onRightClick={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}
