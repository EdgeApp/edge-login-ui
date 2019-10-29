import React, { Component } from 'react'

import LoginCachedUsers from '../connectors/LoginCachedUsers.connector'
import ModalAccountCacheDelete from '../connectors/ModalAccountCacheDelete.connector'
import t from '../lib/LocaleStrings.js'
import styles from '../styles/LoginWithPin.scss'
import PinInput from './ComponentPinInput'

export default class LoginWithPin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pinFocus: false
    }
  }

  handleChangePin = e => {
    const { user } = this.props
    let pin = e.target.value
    // Cut PIN to 4when PIN is greater than 4
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    // Change pin only when input is numbers
    if (/^\d+$/.test(pin) || pin.length === 0) {
      this.props.handleLoginPin(pin)
    }
    // Auto submit PIN when length is at 4
    if (pin.length > 3) {
      setTimeout(this.props.handleSubmit({ user, pin }), 200)
    }
  }

  pinFocus = () => {
    return this.refs.pin.focus()
  }

  componentWillUnmount() {
    this.setState({ pinFocus: true })
    this.props.handleLoginPin('')
  }

  render() {
    if (this.props.modalAccountCacheDelete) {
      return <ModalAccountCacheDelete />
    }
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>{t('login_with_password_header')}</p>
          <p className={styles.subHeaderText}>
            {t('login_with_pin_sub_header')}
          </p>
          <form className={styles.form}>
            {this.props.showCachedUsers && (
              <div className={styles.formGroup}>
                <label>{t('label_username')}</label>
                <LoginCachedUsers />
              </div>
            )}
            {!this.props.showCachedUsers && (
              <div className={styles.formGroup}>
                <label
                  className={this.props.loading ? styles.lableDisabled : null}
                >
                  {t('label_username')}
                </label>
                <input
                  type="text"
                  name="user"
                  ref="user"
                  value={this.props.user}
                  onFocus={this.props.openCachedUsers}
                  disabled={this.props.loading}
                  readOnly
                />
                <div
                  className={styles.caret}
                  onClick={this.props.openCachedUsers}
                >
                  <div className={styles.icon} />
                </div>
              </div>
            )}
            {!this.props.loading && !this.props.showCachedUsers && (
              <PinInput
                handleChangePin={this.handleChangePin}
                pin={this.props.pin}
              />
            )}
            {this.props.loading && <div className={styles.loader} />}
            {!this.props.loading && !this.props.showCachedUsers && (
              <p
                className={styles.exitPin}
                onClick={this.props.closeLoginWithPinScreen}
              >
                {t('login_with_pin_exit_pin_screen')}
              </p>
            )}
          </form>
        </div>
      </section>
    )
  }
}
