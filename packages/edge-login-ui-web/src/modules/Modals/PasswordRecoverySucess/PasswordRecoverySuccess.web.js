import React from 'react'

import recoverySetupIcon from '../../../img/modals/recovery-setup-W.png'
import Modal from '../BaseModal.js'
import styles from './PasswordRecoverySuccess.webStyle.scss'

export default ({ view, close, finish }) => (
  <Modal active={view} close={close} icon={recoverySetupIcon}>
    <p className={styles.header}>Password Recovery Setup complete!</p>
    <p className={styles.text}>
      Please ensure you retain a copy of the email you sent to yourself. Use the
      link in the email to recover yoru account if your password is forgotten.
    </p>
    <button className={styles.primary} onClick={finish}>
      Done
    </button>
    <p className={styles.cancel}>
      Didn’t get an email or need to send it again?
      <br />
      <span className={styles.link} onClick={close}>
        Go back to the previous screen
      </span>
    </p>
  </Modal>
)
