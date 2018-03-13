import React from 'react'

import passwordIcon from '../../img/account-settings/password-W.png'
import pinIcon from '../../img/account-settings/PIN-W.png'
import recoveryIcon from '../../img/account-settings/recovery-W.png'
import styles from './AccountManagement.webStyle.scss'

export default ({
  account,
  gotoChangePin,
  gotoChangePassword,
  gotoChangePasswordRecovery
}) => (
  <div className={styles.container}>
    <p className={styles.header}>
      <span className={styles.heavy}>Account name:</span> {account.username}
    </p>
    <div className={styles.main}>
      <div className={styles.square} onClick={gotoChangePin}>
        <img src={pinIcon} />
        <p className={styles.label}>Change Pin</p>
      </div>
      <div className={styles.square} onClick={gotoChangePassword}>
        <img src={passwordIcon} />
        <p className={styles.label}>Change Password</p>
      </div>
      <div className={styles.square} onClick={gotoChangePasswordRecovery}>
        <img src={recoveryIcon} />
        <p className={styles.label}>
          Setup / Change<br />Password Recovery
        </p>
      </div>
    </div>
  </div>
)
