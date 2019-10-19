import React, { Component } from 'react'

import LoginCachedUsers from '../connectors/LoginCachedUsers.connector'
import ModalAccountCacheDelete from '../connectors/ModalAccountCacheDelete.connector'
import ModalForgotPassword from '../connectors/ModalForgotPassword.connector'
import logo from '../img/edge-logo-blue.svg'
import t from '../lib/LocaleStrings.js'
import styles from '../styles/LoginWithPassword.scss'
import NavigationButtons from './LayoutNavigationButtons'
import ScreenHeader from './LayoutScreenHeader'

export default class LoginWithPassword extends Component {
  usernameKeyPress = e => {
    if (e.charCode === 13) {
      return this.refs.password.focus()
    }
  }
  passwordKeyPress = e => {
    if (e.charCode === 13) {
      if (!this.props.loading) {
        return this.handleSubmit()
      }
    }
  }
  openCachedUsers = () => {
    if (this.props.cachedUsers.length > 0) {
      return this.props.openCachedUsers()
    }
  }
  handleSubmit = () => {
    const { username, password, edgeObject } = this.props
    this.props.handleSubmit({ username, password, edgeObject })
  }
  componentWillUnmount () {
    this.props.unmountLoginPasswordScreen()
  }
  render () {
    if (this.props.modalAccountCacheDelete) {
      return <ModalAccountCacheDelete />
    }
    if (this.props.modalForgotPassword) {
      return <ModalForgotPassword />
    }
    return (
      <section className={styles.rootContainer}>
        <ScreenHeader location={'login'} history={this.props.history} />
        <div className={styles.container}>
          <p className={styles.headerText}>{t('login_with_password_header')}</p>
          <p className={styles.subHeaderText}>
            {t('login_with_password_sub_header')}
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
                  name="username"
                  ref="username"
                  value={this.props.username}
                  onChange={this.props.changeUsernameValue}
                  onKeyPress={this.usernameKeyPress}
                  disabled={this.props.loading}
                />
                {!this.props.loading && this.props.cachedUsers.length > 0 && (
                  <div className={styles.caret} onClick={this.openCachedUsers}>
                    <div className={styles.icon} />
                  </div>
                )}
              </div>
            )}
            {!this.props.showCachedUsers && (
              <div className={styles.formGroup}>
                <label
                  className={this.props.loading ? styles.lableDisabled : null}
                >
                  {t('label_password')}
                </label>
                <input
                  type="password"
                  name="password"
                  ref="password"
                  value={this.props.password}
                  onChange={this.props.changePasswordValue}
                  onKeyPress={this.passwordKeyPress}
                  disabled={this.props.loading}
                />
                <p
                  className={styles.forgotPasswordLink}
                  onClick={this.props.openModalForgotPassword}
                >
                  {t('login_with_password_forgot_password')}
                </p>
              </div>
            )}
          </form>
          <button
            className={styles.primaryImage}
            onClick={this.props.openLoginEdgePage}
          >
            {t('string_login_with')}
            <img src={logo} alt="Edge Logo" className={styles.image} />
          </button>
          <NavigationButtons
            loading={this.props.loading}
            onRightClick={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}
