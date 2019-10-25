import React, { Component } from 'react'
import {
  IoIosSync as Sync,
  IoMdKeypad as Keypad,
  IoMdLock as Lock
} from 'react-icons/io'

import ModalAccountPasswordCheck from '../connectors/ModalAccountPasswordCheck.connector'
import t from '../lib/LocaleStrings.js'
import styles from '../styles/AccountHome.scss'

export default class AccountHome extends Component {
  componentWillMount() {
    if (window.abcui.abcAccount) {
      this.props.userLogin(window.abcui.abcAccount)
    }
  }

  render() {
    if (this.props.account.edgeLogin) {
      return (
        <section className={styles.rootContainer}>
          <div className={styles.edgeLoginContainer}>
            <p className={styles.edgeLoginText}>
              {t('account_home_edge_login')}
            </p>
            <br />
            <p>
              <a
                href="https://edge.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('account_home_download_edge')}
              </a>
            </p>
          </div>
        </section>
      )
    }
    if (this.props.passwordCheckModal) {
      return <ModalAccountPasswordCheck history={this.props.history} />
    }
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>
            {sprintf(t('account_welcome'), this.props.account.username)}
          </p>
          <div
            className={styles.box}
            onClick={() => this.props.openAccountPasswordCheckModal('pin')}
          >
            <p className={styles.iconContainer}>
              <Keypad className={styles.icon} />
            </p>
            <p className={styles.text}>{t('account_home_change_pin')}</p>
          </div>
          <div
            className={styles.box}
            onClick={() => this.props.openAccountPasswordCheckModal('password')}
          >
            <p className={styles.iconContainer}>
              <Lock className={styles.icon} />
            </p>
            <p className={styles.text}>{t('account_home_change_password')}</p>
          </div>
          <div
            className={styles.box}
            onClick={() => this.props.openAccountPasswordCheckModal('recovery')}
          >
            <p className={styles.iconContainer}>
              <Sync className={styles.icon} />
            </p>
            <p className={styles.text}>{t('account_home_recover_password')}</p>
          </div>
        </div>
      </section>
    )
  }
}
