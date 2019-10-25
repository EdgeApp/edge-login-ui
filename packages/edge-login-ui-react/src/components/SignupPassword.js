import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/SignupPassword.scss'
import PasswordInput from './ComponentPasswordInput'
import NavigationButtons from './LayoutNavigationButtons'

export default class SignupPassword extends Component {
  handleSubmit = () => {
    const {
      password,
      passwordRepeat,
      validation,
      username,
      pin,
      clearError
    } = this.props
    const callback = (error, account) => {
      if (error) {
        return this.props.handleError(error.message || error)
      }
      this.props.setReviewDetails({ username, password, pin })
      return this.props.openReviewScreen()
    }
    return this.props.handleSubmit(
      {
        password,
        passwordRepeat,
        validation,
        username,
        pin
      },
      callback
    )
  }

  render() {
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>{t('signup_welcome')}</p>
          <p className={styles.subHeaderText}>{t('signup_password_header')}</p>
          <form className={styles.form}>
            <PasswordInput
              visibility={this.props.inputState}
              password={this.props.password}
              passwordRepeat={this.props.passwordRepeat}
              validation={this.props.validation}
              changePasswordValue={this.props.changePasswordValue}
              changePasswordRepeatValue={this.props.changePasswordRepeatValue}
              togglePasswordVisibility={this.props.togglePasswordVisibility}
              loading={this.props.loading}
              handleSubmit={this.handleSubmit}
            />
          </form>
          <NavigationButtons
            onLeftClick={this.props.openPinScreen}
            onRightClick={this.handleSubmit}
            loading={this.props.loading}
          />
        </div>
      </section>
    )
  }
}
