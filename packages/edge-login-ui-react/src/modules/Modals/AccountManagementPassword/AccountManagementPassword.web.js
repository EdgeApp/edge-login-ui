import React from 'react'
import Input from 'react-toolbox/lib/input'

import passwordIcon from '../../../img/account-settings/password-W.png'
import Modal from '../BaseModal.js'
import styles from './AccountManagementPassword.webStyle.scss'

export default ({
  close,
  submit,
  passwordKeyPressed,
  changePasswordValue,
  view,
  password,
  route,
  error,
  user,
  loader
}) => {
  const renderButtonRows = () => {
    if (!loader) {
      return (
        <div className={styles.customRow}>
          <button className={styles.secondary} onClick={close}>
            Back
          </button>
          <button className={styles.primary} onClick={submit}>
            Next
          </button>
        </div>
      )
    }
    if (loader) {
      return (
        <div className={styles.customRow}>
          <button className={styles.secondaryLoad}>Back</button>
          <button className={styles.primaryLoad}>
            <div className={styles.loader} />
          </button>
        </div>
      )
    }
  }
  return (
    <Modal active={view} close={close} icon={passwordIcon}>
      <p className={styles.header}>
        Enter your password to make changes to your account settings
      </p>
      <Input
        autoFocus
        type="password"
        onKeyPress={passwordKeyPressed}
        onChange={changePasswordValue}
        value={password}
        label="Your Current Password"
        className={styles.password}
        error={error}
      />
      {renderButtonRows()}
    </Modal>
  )
}
