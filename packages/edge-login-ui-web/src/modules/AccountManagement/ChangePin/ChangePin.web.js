import React from 'react'
import Input from 'react-toolbox/lib/input'

import styles from './ChangePin.webStyle.scss'

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
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={gotoAccount}>
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
