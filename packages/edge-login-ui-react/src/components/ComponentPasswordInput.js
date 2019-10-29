import React, { Component } from 'react'
import { IoIosEye, IoIosEyeOff, IoMdCheckmark } from 'react-icons/io'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/GlobalInputs.scss'

export default class PasswordInput extends Component {
  passwordKeyPress = e => {
    if (e.charCode === 13) {
      this.refs.passwordRepeat.focus()
    }
  }

  passwordRepeatKeyPress = e => {
    if (e.charCode === 13) {
      return this.props.handleSubmit()
    }
  }

  render() {
    const {
      password,
      changePasswordValue,
      passwordRepeat,
      changePasswordRepeatValue,
      visibility,
      togglePasswordVisibility,
      validation,
      loading
    } = this.props
    return (
      <section className={styles.passwordGroupContainer}>
        <div className={styles.formGroup}>
          <label className={loading ? 'lableDisabled' : null}>
            {t('label_enter_password')}
          </label>
          <input
            type={visibility ? 'text' : 'password'}
            name="password"
            ref="password"
            value={password}
            onChange={changePasswordValue}
            onKeyPress={this.passwordKeyPress}
            disabled={loading}
            autoFocus
          />
          {!this.props.loading && (
            <div
              className={styles.caret}
              onClick={() => togglePasswordVisibility(visibility)}
            >
              {visibility && <IoIosEyeOff className={styles.icon} />}
              {!visibility && <IoIosEye className={styles.icon} />}
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label
            className={
              loading || !validation.passwordValid ? 'lableDisabled' : null
            }
          >
            {t('label_enter_re_password')}
          </label>
          <input
            type={visibility ? 'text' : 'password'}
            name="passwordRepeat"
            ref="passwordRepeat"
            value={passwordRepeat}
            onChange={changePasswordRepeatValue}
            onKeyPress={this.passwordRepeatKeyPress}
            disabled={loading || !validation.passwordValid}
          />
        </div>
        <div className={styles.verificationContainer}>
          <div className={styles.row}>
            <div
              className={
                validation.upperCaseChar ? styles.iconVerified : styles.icon
              }
            >
              <IoMdCheckmark className={styles.check} />
            </div>
            <div
              className={
                validation.upperCaseChar ? styles.text : styles.textVerified
              }
            >
              <p>{t('password_verification_uppercase')}</p>
            </div>
          </div>
          <div className={styles.row}>
            <div
              className={
                validation.lowerCaseChar ? styles.iconVerified : styles.icon
              }
            >
              <IoMdCheckmark className={styles.check} />
            </div>
            <div
              className={
                validation.lowerCaseChar ? styles.text : styles.textVerified
              }
            >
              <p>{t('password_verification_lowecase')}</p>
            </div>
          </div>
          <div className={styles.row}>
            <div
              className={validation.number ? styles.iconVerified : styles.icon}
            >
              <IoMdCheckmark className={styles.check} />
            </div>
            <div
              className={validation.number ? styles.text : styles.textVerified}
            >
              <p>{t('password_verification_number')}</p>
            </div>
          </div>
          <div className={styles.row}>
            <div
              className={
                validation.characterLength ? styles.iconVerified : styles.icon
              }
            >
              <IoMdCheckmark className={styles.check} />
            </div>
            <div
              className={
                validation.characterLength ? styles.text : styles.textVerified
              }
            >
              <p>{t('password_verification_characters')}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
