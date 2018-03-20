import React from 'react'

import successIcon from '../../../img/modals/success-W.png'
import Modal from '../BaseModal.js'
import styles from './AccountCreated.webStyle.scss'

export default ({ view, name, close, cancel, submit }) => (
  <Modal active={view} close={close} icon={successIcon}>
    <div className={styles.container}>
      <p className={styles.header}>Account created!</p>
      <p className={styles.p1}>Your {name} account has been created.</p>
      <p className={styles.p2}>
        Your username and password are known only to you and cannot be reset by{' '}
        {name}.
      </p>
      <p className={styles.p3}>
        Would you like to set up password recovery questions to reset your
        account in case of a forgotten password?
      </p>
      <div className={styles.rowButtons}>
        <button className={styles.secondary} onClick={cancel}>
          I&apos;ll do it later
        </button>
        <button className={styles.primary} onClick={submit}>
          Setup Recovery
        </button>
      </div>
    </div>
  </Modal>
)
