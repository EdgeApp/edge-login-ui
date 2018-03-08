import React from 'react'
import Input from 'react-toolbox/lib/input'

import styles from './ChangePin.mobileStyle.scss'

export default ({
  pin,
  loader,
  error,
  handleSubmit,
  passwordKeyPressed,
  handleOnChangePin,
  gotoAccount
}) => {
  const renderButtons = () => {
    if (!loader) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={handleSubmit}>
            Submit
          </button>
          <button className={styles.secondaryMobile} onClick={gotoAccount}>
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
      <Input
        autoFocus
        onKeyPress={passwordKeyPressed}
        onChange={handleOnChangePin}
        value={pin}
        type="password"
        placeholder="New PIN"
        name="pin"
        className={pin.length > 0 ? styles.inputed : styles.input}
        error={error}
      />
      {renderButtons()}
    </div>
  )
}
