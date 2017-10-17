import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input'
import FontIcon from 'react-toolbox/lib/font_icon'

import Success from '../Modals/Success/Success.js'

import { validate } from '../Signup/Password/PasswordValidation/PasswordValidation.middleware'
import { checkPassword } from './ChangePassword.middleware'
import {
  changePasswordHidePassword,
  changePasswordShowPassword,
  changeNewPasswordValue,
  changeNewPasswordRepeatValue,
  errorChangePassword,
  errorChangePasswordRepeat,
  passwordChanged,
  clearChangePassword
} from './ChangePassword.action'
import { openSuccessModal, closeSuccessModal } from '../Modals/Success/Success.action.js'
// import { calculateTime } from '../../lib/helper'

import styles from './ChangePassword.mobileStyle.scss'
import eyeShow from '../../img/create-account/show-password.png'
import eyeHide from '../../img/create-account/hide-password.png'

class ChangePassword extends Component {
  _handleSubmit = () => {
    const callback = (error) => {
      this.props.dispatch(clearChangePassword())
      if (error) {
        if (error.type === 'password') {
          return this.props.dispatch(errorChangePassword(error.message))
        }
        if (error.type === 'passwordRepeat') {
          return this.props.dispatch(errorChangePasswordRepeat(error.message))
        }
      }
      if (!error) {
        this.props.dispatch(passwordChanged())
        this.props.dispatch(openSuccessModal())
      }
    }
    this.props.dispatch(
      checkPassword(
        this.props.newPassword,
        this.props.newPasswordRepeat,
        this.props.user,
        callback
      )
    )
  }
  _handleSuccess = () => {
    this.props.dispatch(closeSuccessModal())
    return this.props.history.push('/account')
  }
  _handleOnChangeNewPassword = (newPassword) => {
    this.props.dispatch(changeNewPasswordValue(newPassword))
    this.props.dispatch(validate(newPassword))
  }
  _handleOnChangeNewPasswordRepeat = (newPasswordRepeat) => {
    this.props.dispatch(changeNewPasswordRepeatValue(newPasswordRepeat))
  }
  toggleRevealPassword = (e) => {
    if (this.props.revealPassword) {
      return this.props.dispatch(changePasswordHidePassword())
    } else {
      return this.props.dispatch(changePasswordShowPassword())
    }
  }
  _passwordKeyPress = (e) => {
    if (e.charCode === 13) {
      return this.passwordRepeat.getWrappedInstance().focus()
    }
  }
  _passwordRepeatKeyPress = (e) => {
    if (e.charCode === 13) {
      if (!this.props.loader.loading) {
        return this._handleSubmit()
      }
    }
  }
  _renderButtonRows = () => {
    if (!this.props.loader.loading) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={this._handleSubmit}>Submit</button>
          <button className={styles.secondaryMobile} onClick={e => this.props.history.push('/account')}>Back</button>
        </div>
      )
    }
    if (this.props.loader.loading) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryLoadMobile}><div className={styles.loader} /></button>
          <button className={styles.secondaryLoadMobile}>Back</button>
        </div>
      )
    }
  }
  render () {
    const { revealPassword, validation, newPassword, newPasswordRepeat, errorPassword, errorPasswordRepeat } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.requirements}>
          <p className={styles.textHeader}>Password Requirements:</p>
          <p className={styles.text}>
            {validation.upperCaseChar ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
            Must have at least one upper case letter
          </p>
          <p className={styles.text}>
            {validation.lowerCaseChar ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
            Must have at least one lower case letter
          </p>
          <p className={styles.text}>
            {validation.number ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
            Must have at least one number
          </p>
          <p className={styles.text}>
            {validation.characterLength ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
            Must have at least 10 characters
          </p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWithIcon}>
            <Input
              autoFocus
              type={this.props.revealPassword ? 'text' : 'password'}
              onChange={this._handleOnChangeNewPassword}
              label='Password'
              value={newPassword}
              className={styles.form}
              error={errorPassword}
              onKeyPress={this._passwordKeyPress}
              ref={input => { this.password = input }}
            />
            <img src={revealPassword ? eyeHide : eyeShow} className={styles.icon} onClick={this.toggleRevealPassword} />
          </div>
          <Input
            type={this.props.revealPassword ? 'text' : 'password'}
            onChange={this._handleOnChangeNewPasswordRepeat}
            label='Re-enter Password'
            value={newPasswordRepeat}
            className={styles.form}
            error={errorPasswordRepeat}
            onKeyPress={this._passwordRepeatKeyPress}
            ref={input => { this.passwordRepeat = input }}
          />
        </div>
        {this._renderButtonRows()}
        <Success header='Password successfully changed' close={this._handleSuccess} />
      </div>
    )
  }
}

export default connect(state => ({
  revealPassword: state.changePassword.revealPassword,
  newPassword: state.changePassword.newPassword,
  newPasswordRepeat: state.changePassword.newPasswordRepeat,
  errorPassword: state.changePassword.errorPassword,
  errorPasswordRepeat: state.changePassword.errorPasswordRepeat,
  loader: state.loader,
  validation: state.password.validation,
  user: state.user
}))(ChangePassword)
