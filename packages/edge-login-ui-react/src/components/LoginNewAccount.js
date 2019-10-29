import React, { Component } from 'react'
import { sprintf } from 'sprintf-js'

import logo from '../img/edge-logo-blue.svg'
import t from '../lib/LocaleStrings.js'
import styles from '../styles/LoginNewAccount.scss'

export default class LoginNewAccount extends Component {
  render() {
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>
            {sprintf(t('headers_login'), window.abcui.vendorName)}
          </p>
          <button
            className={styles.createAccountButton}
            onClick={this.props.goToSignupPage}
          >
            {t('login_new_account_create_account')}
          </button>
          <p className={styles.signInText}>
            {t('login_new_account_signin_text')}
            <span
              className={styles.link}
              onClick={this.props.handleOpenLoginWithPasswordPage}
            >
              {t('login_new_account_signin')}
            </span>
          </p>
          <button
            className={styles.primaryImage}
            onClick={this.props.handleOpenLoginUsingEdgePage}
          >
            {t('string_login_with')}
            <img src={logo} alt="Edge Logo" className={styles.image} />
          </button>
        </div>
      </section>
    )
  }
}
