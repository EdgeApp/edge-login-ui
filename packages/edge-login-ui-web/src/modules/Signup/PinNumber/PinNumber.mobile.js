import React from 'react'
import Input from 'react-toolbox/lib/input'

import t from '../../../lib/web/LocaleStrings'
import styles from './PinNumber.mobileStyle.scss'

export default ({
  pin,
  error,
  handleSubmit,
  handleOnChangeText,
  handleKeyEnter,
  gotoUsername
}) => (
  <div className={styles.container}>
    <p className={styles.header}>Choose a 4 Digit PIN</p>
    <Input
      autoFocus
      type="password"
      name="pin"
      placeholder={t('activity_signup_pin_hint')}
      onChange={handleOnChangeText}
      onKeyPress={handleKeyEnter}
      value={pin}
      error={error}
      className={pin.length > 0 ? styles.inputed : styles.input}
    />
    <p className={styles.text}>
      Your PIN is a 4 digit code used to do quick re-logins into your account
    </p>
    <div className={styles.rowButtonsHorizontalMobile}>
      <button className={styles.primaryMobile} onClick={handleSubmit}>
        Next
      </button>
      <button className={styles.secondaryMobile} onClick={gotoUsername}>
        Back
      </button>
    </div>
  </div>
)
