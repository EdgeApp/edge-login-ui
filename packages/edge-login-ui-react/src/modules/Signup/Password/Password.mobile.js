import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon'
import Input from 'react-toolbox/lib/input'

import eyeHide from '../../../img/create-account/hide-password.png'
import eyeShow from '../../../img/create-account/show-password.png'
import styles from './Password.mobileStyle.scss'

export default ({
  inputState,
  password,
  passwordRepeat,
  validation,
  error,
  loader,
  handleSubmit,
  refPassword,
  refPasswordRepeat,
  passwordKeyPressed,
  passwordRepeatKeyPressed,
  handleOnChangePassword,
  handleOnChangePasswordRepeat,
  toggleRevealPassword,
  gotoPin
}) => {
  const renderButton = () => {
    if (!loader) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={handleSubmit}>
            Submit
          </button>
          <button className={styles.secondaryMobile} onClick={gotoPin}>
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
      <p className={styles.header}>Create Password</p>
      <p className={styles.description}>
        The password is used to authenticate your account and to change
        sensitive settings.
      </p>
      <div className={styles.divider} />
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
            type={inputState ? 'text' : 'password'}
            onChange={handleOnChangePassword}
            label="Password"
            value={password}
            className={styles.form}
            error={error.password}
            onKeyPress={passwordKeyPressed}
            ref={refPassword}
          />
          <img
            src={inputState ? eyeHide : eyeShow}
            className={styles.icon}
            onClick={toggleRevealPassword}
          />
        </div>
        <Input
          type={inputState ? 'text' : 'password'}
          onChange={handleOnChangePasswordRepeat}
          label="Re-enter Password"
          value={passwordRepeat}
          className={styles.form}
          error={error.passwordRepeat}
          onKeyPress={passwordRepeatKeyPressed}
          ref={refPasswordRepeat}
        />
      </div>
      {renderButton()}
    </div>
  )
}
