import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/SignupPinNumber.scss'
import PinInput from './ComponentPinInput'
import NavigationButtons from './LayoutNavigationButtons'

export default class AccountChangePin extends Component {
  handleSubmit = () => {
    this.props.handleSubmit(this.props.pin, this.props.account, error => {
      if (error) {
        return this.props.handleError(error)
      }
      this.props.handleSuccess(t('account_pin_success_message'))
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
      this.props.changePinValue(pin)
    }
  }

  componentDidUpdate() {
    // Auto submit PIN when length is at 4
    if (this.props.pin.length >= 4) {
      this.handleSubmit()
    }
  }

  render() {
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.subHeaderText}>{t('account_pin_text')}</p>
          <form className={styles.form}>
            <PinInput
              handleChangePin={this.handleChangePin}
              loading={this.props.loading}
              pin={this.props.pin}
            />
          </form>
          <NavigationButtons
            loading={this.props.loading}
            onLeftClick={this.props.openAccountHomeScreen}
          />
        </div>
      </section>
    )
  }
}
