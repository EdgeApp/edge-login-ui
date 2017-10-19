import React from 'react'
import styles from './AccountManagement.mobileStyle.scss'
import pinIcon from '../../img/account-settings/PIN-MW.png'
import passwordIcon from '../../img/account-settings/password-MW.png'
import recoveryIcon from '../../img/account-settings/recovery-MW.png'

export default ({
  account,
  gotoChangePin,
  gotoChangePassword,
  gotoChangePasswordRecovery
}) => (
  <div className={styles.container}>
    <p className={styles.header}>
      Account name:
    </p>
    <p className={styles.accountName}>
      { account.username }
    </p>
    <div className={styles.square} onClick={gotoChangePin} >
      <img src={pinIcon} />
      <p className={styles.label}>Change Pin</p>
    </div>
    <div className={styles.square} onClick={gotoChangePassword}>
      <img src={passwordIcon} />
      <p className={styles.label}>Change Password</p>
    </div>
    <div className={styles.square} onClick={gotoChangePasswordRecovery}>
      <img src={recoveryIcon} />
      <p className={styles.label}>Setup/Change Password Recovery</p>
    </div>
  </div>
)
