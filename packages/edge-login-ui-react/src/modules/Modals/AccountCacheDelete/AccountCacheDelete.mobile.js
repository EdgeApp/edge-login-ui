import React from 'react'

import deleteIcon from '../../../img/modals/delete-MW.png'
import Modal from '../BaseModal.js'
import styles from './AccountCacheDelete.mobileStyle.scss'

export default ({ view, name, close, deleteAccount }) => (
  <Modal active={view} close={name} icon={deleteIcon}>
    <p className={styles.header}>Delete Account</p>
    <p className={styles.text}>
      Delete <span className={styles.heavy}>{name}</span> on this device only?
      This will remove the 2FA and PIN access from this device. If 2FA is
      enabled on this account, you will be unable to access this account for 7
      days from new devices.
    </p>
    <div className={styles.rowButtonsMobile}>
      <button className={styles.secondaryMobile} onClick={close}>
        Cancel
      </button>
      <button className={styles.primaryMobile} onClick={deleteAccount}>
        Delete
      </button>
    </div>
  </Modal>
)
