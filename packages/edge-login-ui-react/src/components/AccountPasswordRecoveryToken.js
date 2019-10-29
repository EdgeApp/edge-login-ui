import React, { Component } from 'react'

import ModalPasswordRecoverySuccess from '../connectors/ModalPasswordRecoverySuccess.connector'
import t from '../lib/LocaleStrings'
import styles from '../styles/AccountPasswordRecoveryToken.scss'

export default class AccountPasswordRecoveryToken extends Component {
  handleSubmit = address => {
    const callback = (error, url) => {
      if (error) {
        return this.props.handleError(error)
      }
      if (!error && url) {
        window.open(url, '_blank')
        return this.props.handleSuccess()
      }
    }
    return this.props.handleSubmit(
      address,
      this.props.email,
      this.props.token,
      this.props.account.username,
      callback
    )
  }

  render() {
    if (this.props.passwordRecoverySuccess) {
      return <ModalPasswordRecoverySuccess />
    }
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>
            {t('account_password_recovery_token_header')}
          </p>
          <p className={styles.subHeaderText}>
            {t('account_password_recovery_token_sub_header')}
          </p>
          <form className={styles.form}>
            <label>{t('label_email')}</label>
            <input
              type="email"
              name="email"
              ref="email"
              value={this.props.email}
              onChange={e => this.props.changeEmaileValue(e.target.value)}
              disabled={this.props.loading}
            />
          </form>
          <div className={styles.spacer} />
          <div className={styles.buttonContainer}>
            <p className={styles.buttonText}>
              {t('account_password_recovery_token_send_width')}
            </p>
            <div className={styles.buttonRow}>
              <div
                className={styles.buttonGmail}
                onClick={() => this.handleSubmit('google')}
              >
                <p>{t('account_password_recovery_token_gmail')}</p>
              </div>
              <div
                className={styles.buttonHotmail}
                onClick={() => this.handleSubmit('microsoft')}
              >
                <p>{t('account_password_recovery_token_hotmail')}</p>
              </div>
            </div>
            <div className={styles.buttonRow}>
              <div
                className={styles.buttonYahoo}
                onClick={() => this.handleSubmit('yahoo')}
              >
                <p>{t('account_password_recovery_token_yahoo')}</p>
              </div>
              <div
                className={styles.buttonGeneric}
                onClick={() => this.handleSubmit('generic')}
              >
                <p>{t('account_password_recovery_token_generic')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
