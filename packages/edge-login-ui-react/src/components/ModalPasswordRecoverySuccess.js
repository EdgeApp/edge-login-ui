import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/ModalPasswordRecoverySuccess.scss'
import NavigationButtons from './LayoutNavigationButtons'

export default class ModalPasswordRecoverySuccess extends Component {
  render () {
    return (
      <section className={styles.container}>
        <p className={styles.headerText}>
          {t('modal_account_account_password_recovery_success_header')}
        </p>
        <p className={styles.text1}>
          {t('modal_account_account_password_recovery_success_text1')}
        </p>
        <p className={styles.text2}>
          {t('modal_account_account_password_recovery_success_text2')}
        </p>
        <p
          className={styles.text3}
          onClick={this.props.closePasswordRecoverySuccessModal}
        >
          {t('modal_account_account_password_recovery_success_link')}
        </p>
        <NavigationButtons
          onLeftClick={this.props.closePasswordRecoverySuccessModal}
          onRightClick={this.props.finishPasswordRecoveryToken}
        />
      </section>
    )
  }
}
