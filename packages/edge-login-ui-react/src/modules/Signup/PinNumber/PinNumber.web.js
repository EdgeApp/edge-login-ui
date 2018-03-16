import React from 'react'
import Input from 'react-toolbox/lib/input'

import t from '../../../lib/web/LocaleStrings'
import styles from './PinNumber.webStyle.scss'

export default ({
  pin,
  error,
  handleSubmit,
  handleOnChangeText,
  handleKeyEnter,
  gotoUsername
}) => {
  const pinStyle = () => {
    if (pin.length > 0) {
      return { textAlign: 'center', fontSize: '70px', height: '80px' }
    } else {
      return { textAlign: 'center', fontSize: '35px', height: '80px' }
    }
  }
  return (
    <div className={styles.container}>
      <p className={styles.header}>Choose a 4 Digit PIN</p>
      <div className={styles.password}>
        <Input
          autoFocus
          type="password"
          name="pin"
          placeholder={t('activity_signup_pin_hint')}
          style={pinStyle()}
          onChange={handleOnChangeText}
          onKeyPress={handleKeyEnter}
          value={pin}
          error={error}
          className={styles.input}
        />
      </div>
      <p className={styles.bullet}>
        Your PIN is a 4 digit code used to do quick re-logins into your account
      </p>
      <div className={styles.rowButtons}>
        <button className={styles.secondary} onClick={gotoUsername}>
          Back
        </button>
        <button className={styles.primary} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  )
}
