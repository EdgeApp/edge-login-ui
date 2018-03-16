import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon'
import Input from 'react-toolbox/lib/input'

import eyeHide from '../../../img/create-account/hide-password.png'
import eyeShow from '../../../img/create-account/show-password.png'
import styles from './ChangePassword.webstyle.scss'

export default ({
  revealPassword,
  newPassword,
  newPasswordRepeat,
  errorPassword,
  errorPasswordRepeat,
  loader,
  validation,
  handleSubmit,
  passwordKeyPress,
  passwordRepeatKeyPress,
  handleOnChangeNewPassword,
  handleOnChangeNewPasswordRepeat,
  refPassword,
  refPasswordRepeat,
  toggleRevealPassword,
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
      <div className={styles.main}>
        <div className={styles.tooltip}>
          <p className={styles.textHeader}>Password Requirements:</p>
          <p className={styles.text}>
            {validation.upperCaseChar ? (
              <FontIcon value="done" className={styles.check} />
            ) : (
              <span className={styles.bullet}>•</span>
            )}
            Must have at least one upper case letter
          </p>
          <p className={styles.text}>
            {validation.lowerCaseChar ? (
              <FontIcon value="done" className={styles.check} />
            ) : (
              <span className={styles.bullet}>•</span>
            )}
            Must have at least one lower case letter
          </p>
          <p className={styles.text}>
            {validation.number ? (
              <FontIcon value="done" className={styles.check} />
            ) : (
              <span className={styles.bullet}>•</span>
            )}
            Must have at least one number
          </p>
          <p className={styles.text}>
            {validation.characterLength ? (
              <FontIcon value="done" className={styles.check} />
            ) : (
              <span className={styles.bullet}>•</span>
            )}
            Must have at least 10 characters
          </p>
          {/* <p className={styles.crack}>Time to crack: {calculateTime(validation.timeToCrackPassword)}</p> */}
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formWithIcon}>
            <Input
              autoFocus
              label="Password"
              type={revealPassword ? 'text' : 'password'}
              onKeyPress={passwordKeyPress}
              onChange={handleOnChangeNewPassword}
              value={newPassword}
              className={styles.form}
              error={errorPassword}
              ref={refPassword}
            />
            <img
              src={revealPassword ? eyeHide : eyeShow}
              className={styles.icon}
              onClick={toggleRevealPassword}
            />
          </div>
          <Input
            label="Re-enter Password"
            type={revealPassword ? 'text' : 'password'}
            value={newPasswordRepeat}
            onKeyPress={passwordRepeatKeyPress}
            onChange={handleOnChangeNewPasswordRepeat}
            ref={refPasswordRepeat}
            className={styles.form}
            error={errorPasswordRepeat}
          />
        </div>
      </div>
      {renderButtons()}
    </div>
  )
}
