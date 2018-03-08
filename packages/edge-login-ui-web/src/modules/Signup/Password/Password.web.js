import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon'
import Input from 'react-toolbox/lib/input'

import eyeHide from '../../../img/create-account/hide-password.png'
import eyeShow from '../../../img/create-account/show-password.png'
import styles from './Password.webStyle.scss'

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
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={gotoPin}>
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
      <p className={styles.header}>Create a password</p>
      <p className={styles.hint}>
        The password is used to authenticate your account and to change
        sensitive settings.
      </p>
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
              name="password"
              label="Password"
              type={inputState ? 'text' : 'password'}
              onKeyPress={passwordKeyPressed}
              onChange={handleOnChangePassword}
              value={password}
              className={styles.form}
              error={error.password}
              ref={refPassword}
            />
            <img
              src={inputState ? eyeHide : eyeShow}
              className={styles.icon}
              onClick={toggleRevealPassword}
            />
          </div>
          <Input
            name="passwordRepeat"
            label="Re-enter Password"
            type={inputState ? 'text' : 'password'}
            onKeyPress={passwordRepeatKeyPressed}
            onChange={handleOnChangePasswordRepeat}
            value={passwordRepeat}
            className={styles.form}
            error={error.passwordRepeat}
            ref={refPasswordRepeat}
          />
        </div>
      </div>
      {renderButton()}
    </div>
  )
}
