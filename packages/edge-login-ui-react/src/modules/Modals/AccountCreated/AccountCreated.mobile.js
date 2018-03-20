import React from 'react'

import successIcon from '../../../img/modals/success-MW.png'
import Modal from '../BaseModal.js'
import styles from './AccountCreated.mobileStyle.scss'

export default ({ view, name, close, cancel, submit }) => (
  <Modal active={view} close={close} icon={successIcon}>
    <p className={styles.header}>Account created!</p>
    <p className={styles.heavy}>
      Your username and password are known only to you and cannot be reset by{' '}
      {name}.
    </p>
    <p className={styles.text}>
      Would you like to set up password recovery questions to reset your account
      in case of a forgotten password?
    </p>
    <div className={styles.customButtons}>
      <button className={styles.secondaryMobile} onClick={cancel}>
        I&apos;ll do it later
      </button>
      <button className={styles.primaryMobile} onClick={submit}>
        Setup Recovery
      </button>
    </div>
  </Modal>
)
