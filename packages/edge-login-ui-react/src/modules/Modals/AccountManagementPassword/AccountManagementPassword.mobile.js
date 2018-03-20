import React from 'react'
import Input from 'react-toolbox/lib/input'

import passwordIcon from '../../../img/account-settings/password-MW.png'
import Modal from '../BaseModal.js'
import styles from './AccountManagementPassword.mobileStyle.scss'

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
        <div className={styles.rowButtonsMobile}>
          <button className={styles.secondaryMobile} onClick={close}>
            Cancel
          </button>
          <button className={styles.primaryMobile} onClick={submit}>
            Done
          </button>
        </div>
      )
    }
    if (loader) {
      return (
        <div className={styles.rowButtonsMobile}>
          <button className={styles.secondaryLoadMobile}>Back</button>
          <button className={styles.primaryLoadMobile}>
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
