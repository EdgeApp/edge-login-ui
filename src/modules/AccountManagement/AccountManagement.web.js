import React, { Component } from 'react'
// import { connect } from 'react-redux'

import styles from './AccountManagement.webStyle.scss'
// import t from 'lib/web/LocaleStrings'

class AccountManager extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Account name: AirbitzAugur</p>
        <div className={styles.main}>
          <div className={styles.square}>
            <img src="../../../assets/account-settings/PIN-W.png" />
            <p className={styles.label}>Change Pin</p>
          </div>
          <div className={styles.square}>
            <img src="../../../assets/account-settings/password-W.png" />
            <p className={styles.label}>Change Password</p>
          </div>
          <div className={styles.square}>
            <img src="../../../assets/account-settings/recovery-W.png" />
            <p className={styles.label}>Setup / Change<br />Password Recovery</p>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountManager
