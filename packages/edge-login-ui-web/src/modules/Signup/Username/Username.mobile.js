import t from 'lib/web/LocaleStrings'
import React from 'react'
import Input from 'react-toolbox/lib/input'

import styles from './Username.mobileStyle.scss'

export default ({
  username,
  error,
  loader,
  handleSubmit,
  handleOnChangeText,
  handleKeyEnter,
  gotoLogin
}) => {
  const renderButton = () => {
    if (!loader) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={handleSubmit}>
            Next
          </button>
          <button className={styles.secondaryMobile} onClick={gotoLogin}>
            Back
          </button>
        </div>
      )
    }
    if (loader) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryLoadMobile}>
            <div className={styles.loader} />
          </button>
          <button className={styles.secondaryLoadMobile}>Back</button>
        </div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.header}>{t('fragment_setup_username_label')}</p>
      <Input
        autoFocus
        type="text"
        name="username"
        onChange={handleOnChangeText}
        onKeyPress={handleKeyEnter}
        value={username}
        label={t('fragment_landing_username_hint')}
        className={styles.input}
        error={error}
      />
      <ul className={styles.list}>
        <li>
          <p className={styles.bullet}>This is not your email or real name.</p>
        </li>
        <li>
          <p className={styles.bullet}>
            This is the username to login into your account on this and other
            devices.
          </p>
        </li>
        <li>
          <p className={styles.bullet}>
            Your username and password are known only to you and never stored
            unencrypted.
          </p>
        </li>
      </ul>
      {renderButton()}
    </div>
  )
}
