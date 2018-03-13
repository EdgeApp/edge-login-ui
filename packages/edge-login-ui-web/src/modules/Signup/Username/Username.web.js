import t from 'lib/web/LocaleStrings'
import React from 'react'
import Input from 'react-toolbox/lib/input'

import styles from './Username.webStyle.scss'

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
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={gotoLogin}>
            Back
          </button>
          <button className={styles.primary} onClick={handleSubmit}>
            Next
          </button>
        </div>
      )
    }
    if (loader) {
      return (
        <div className={styles.rowButtons}>
          <button className={styles.secondaryLoad}>Back</button>
          <button className={styles.primaryLoad}>
            <div className={styles.loader} />
          </button>
        </div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.header}>Choose a Username</p>
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
      <div className={styles.bullets}>
        <p className={styles.bullet}>
          <span className={styles.bulletIcon}>•</span> This is not your email or
          real name.
        </p>
        <p className={styles.bullet}>
          <span className={styles.bulletIcon}>•</span> This is the username to
          login into your account on this and other devices.
        </p>
        <p className={styles.bullet}>
          <span className={styles.bulletIcon}>•</span> Your username and
          password are known only to you and never stored unencrypted.
        </p>
      </div>
      {renderButton()}
    </div>
  )
}
