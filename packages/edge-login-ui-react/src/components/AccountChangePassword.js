import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/AccountChangePassword.scss'
import PasswordInput from './ComponentPasswordInput'
import NavigationButtons from './LayoutNavigationButtons'

export default class AccountChangePassword extends Component {
  handleSubmit = () => {
    const { password, passwordRepeat, account } = this.props
    const callback = error => {
      if (error) {
        return this.props.handleError(error.message || error)
      }
      return this.props.handleSuccess(t('account_password_success_message'))
    }
    return this.props.handleSubmit(password, passwordRepeat, account, callback)
  }

  render() {
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.subHeaderText}>{t('account_password_text')}</p>
          <form className={styles.form}>
            <PasswordInput
              visibility={this.props.visibility}
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
            onLeftClick={this.props.openAccountHomeScreen}
            onRightClick={this.handleSubmit}
            loading={this.props.loading}
          />
        </div>
      </section>
    )
  }
}
