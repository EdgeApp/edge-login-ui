import React from 'react'

import recoverySetupIcon from '../../../img/modals/recovery-setup-MW.png'
import Modal from '../BaseModal.js'
import styles from './PasswordRecoverySuccess.mobileStyle.scss'

export default ({ view, close, finish }) => (
  <Modal active={view} close={close} icon={recoverySetupIcon}>
    <p className={styles.header}>Password Recovery email sent!</p>
    <p className={styles.text}>
      Please retain the email as you will need it to recover the password. Use
      the link in the email to recover your account if your password is lost or
      forgotten.
    </p>
    <button className={styles.primaryMobile} onClick={finish}>
      Done
    </button>
    <p className={styles.cancel}>
      Didn’t get an email or need to send it again?
    </p>
    <p className={styles.linked} onClick={close}>
      Go back to the previous screen
    </p>
  </Modal>
)
