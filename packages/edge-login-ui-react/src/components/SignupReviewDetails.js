import React, { Component } from 'react'
import { IoMdWarning as WarningIcon } from 'react-icons/io'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/SignupReviewDetails.scss'
import NavigationButtons from './LayoutNavigationButtons'
import ModalAccountCreated from './ModalAccountCreated'

export default class SingupReviewDetails extends Component {
  cancel = () => {
    if (window.abcui.loginCallback) {
      return window.abcui.loginCallback(null, this.props.account)
    }
    return this.props.history.push('/account')
  }
  submit = () => {
    if (window.abcui.loginWithoutClosingCallback) {
      window.abcui.loginWithoutClosingCallback(null, this.props.account)
    }
    return this.props.openRecoveryPassword()
  }
  render () {
    if (this.props.accountCreatedModal) {
      return <ModalAccountCreated cancel={this.cancel} submit={this.submit} />
    }
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>{t('signup_review_header')}</p>
          <p className={styles.subHeaderText}>
            {t('signup_review_sub_header')}
          </p>
          <div className={styles.warning}>
            <WarningIcon className={styles.icon} />
            <p className={styles.text}>{t('signup_review_warning')}</p>
          </div>
          <div
            className={
              this.props.visibility
                ? styles.detailsContainerShown
                : styles.detailsContainerHidden
            }
            onClick={() => this.props.toggleDetails(this.props.visibility)}
          >
            {!this.props.visibility && (
              <p className={styles.text}>{t('signup_review_details_text')}</p>
            )}
            {this.props.visibility && (
              <div className={styles.detailsTextContainer}>
                <div className={styles.detailsRow}>
                  <p className={styles.label}>{t('label_username')}:</p>
                  <p className={styles.detail}>{this.props.details.username}</p>
                </div>
                <div className={styles.detailsRow}>
                  <p className={styles.label}>{t('label_password')}:</p>
                  <p className={styles.detail}>{this.props.details.password}</p>
                </div>
                <div className={styles.detailsRow}>
                  <p className={styles.label}>{t('label_pin')}:</p>
                  <p className={styles.detail}>{this.props.details.pin}</p>
                </div>
              </div>
            )}
          </div>
          <NavigationButtons
            onRightClick={this.props.openModalAccountCreated}
          />
        </div>
      </section>
    )
  }
}
