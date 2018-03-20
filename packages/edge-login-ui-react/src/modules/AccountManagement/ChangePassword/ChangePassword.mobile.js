import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon'
import Input from 'react-toolbox/lib/input'

import eyeHide from '../../../img/create-account/hide-password.png'
import eyeShow from '../../../img/create-account/show-password.png'
import styles from './ChangePassword.mobileStyle.scss'

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
      <div className={styles.requirements}>
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
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formWithIcon}>
          <Input
            autoFocus
            type={revealPassword ? 'text' : 'password'}
            onChange={handleOnChangeNewPassword}
            label="Password"
            value={newPassword}
            className={styles.form}
            error={errorPassword}
            onKeyPress={passwordKeyPress}
            ref={refPassword}
          />
          <img
            src={revealPassword ? eyeHide : eyeShow}
            className={styles.icon}
            onClick={toggleRevealPassword}
          />
        </div>
        <Input
          type={revealPassword ? 'text' : 'password'}
          onChange={handleOnChangeNewPasswordRepeat}
          label="Re-enter Password"
          value={newPasswordRepeat}
          className={styles.form}
          error={errorPasswordRepeat}
          onKeyPress={passwordRepeatKeyPress}
          ref={refPasswordRepeat}
        />
      </div>
      {renderButtons()}
    </div>
  )
}
