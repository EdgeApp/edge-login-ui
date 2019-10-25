import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/ModalForgotPassword.scss'
import NavigationButtons from './LayoutNavigationButtons'

export default class ModalForgotPassword extends Component {
  render() {
    return (
      <section className={styles.container}>
        <p className={styles.headerText}>{t('modal_forgot_password_header')}</p>
        <p className={styles.text1}>
          {t('modal_forgot_password_p1')}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://edge.app"
            className={styles.siteLink}
          >
            {t('app_edge_website')}
          </a>
        </p>
        <br />
        <p className={styles.text1}>{t('modal_forgot_password_p2')}</p>
        <NavigationButtons onRightClick={this.props.closeModalForgotPassword} />
      </section>
    )
  }
}
