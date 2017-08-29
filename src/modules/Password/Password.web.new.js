import React, { Component } from 'react'
import { connect } from 'react-redux'

import FontIcon from 'react-toolbox/lib/font_icon'
import Input from 'react-toolbox/lib/input'
import styles from './Password.webStyle.scss'

import { validate } from './PasswordValidation/PasswordValidation.middleware'
import { checkPassword, skipPassword } from './Password.middleware'
import { changeSignupPage } from '../Signup/Signup.action'
import {
  passwordNotificationShow,
  showPassword,
  hidePassword,
  changePasswordValue,
  changePasswordRepeatValue,
  errorPasswordValue,
  errorPasswordRepeatValue,
  clearPasswordError
} from './Password.action'
import { getDetails } from '../ReviewDetails/ReviewDetails.action'

import eyeShow from '../../img/create-account/show-password.png'
import eyeHide from '../../img/create-account/hide-password.png'

class Password extends Component {
  _handleSubmit = () => {
    const callback = (error, account) => {
      if (error) {
        if (error.type === 'password') {
          this.props.dispatch(clearPasswordError())
          return this.props.dispatch(errorPasswordValue(error.message))
        }
        if (error.type === 'passwordRepeat') {
          this.props.dispatch(clearPasswordError())
          return this.props.dispatch(errorPasswordRepeatValue(error.message))
        }
      }
      if (!error) {
        this.props.dispatch(clearPasswordError())
        this.props.dispatch(
          getDetails({
            username: this.props.username,
            password: this.props.password,
            pin: this.props.pin
          })
        )
        return this.props.dispatch(changeSignupPage('review'))
      }
    }
    this.props.dispatch(
      checkPassword(
        this.props.password,
        this.props.passwordRepeat,
        this.props.validation,
        this.props.username,
        this.props.pin,
        callback
      )
    )
  }
  _handleSubmitSkipPassword = () => {
    const callback = () => this.props.dispatch(changeSignupPage('review'))
    this.props.dispatch(
      skipPassword(
        this.props.username,
        this.props.pin,
        callback
      )
    )
  }
  _handlePasswordNotification = () => {
    this.props.dispatch(passwordNotificationShow())
  }
  passwordKeyPressed = (e) => {
    if (e.charCode === 13) {
      this.passwordRepeat.getWrappedInstance().focus()
    }
  }
  _handleOnChangePassword = (password) => {
    this.props.dispatch(changePasswordValue(password))
    this.props.dispatch(validate(password))
  }
  _handleOnChangePasswordRepeat = (passwordRepeat) => {
    this.props.dispatch(changePasswordRepeatValue(passwordRepeat))
  }
  toggleRevealPassword = (e) => {
    if (this.props.inputState) {
      return this.props.dispatch(hidePassword())
    } else {
      return this.props.dispatch(showPassword())
    }
  }
  _handleKeyEnter = (e) => {
    if (e.nativeEvent.charCode === 13) {
      return this._handleSubmit()
    }
  }
  _renderButtonRows = () => {
    if (!this.props.loader.loading) {
      return (
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={e => this.props.dispatch(changeSignupPage('pin'))}>Back</button>
          <button className={styles.primary} onClick={this._handleSubmit}>Next</button>
        </div>
      )
    }
    if (this.props.loader.loading) {
      return (
        <div className={styles.rowButtons}>
          <button className={styles.secondaryLoad}>Back</button>
          <button className={styles.primaryLoad}><div className={styles.loader} /></button>
        </div>
      )
    }
  }
  render () {
    const { inputState, validation, password, passwordRepeat, error } = this.props
    return (
      <div className={styles.container}>
        <p className={styles.header}>Change your password</p>
        <p className={styles.hint}>The password is used to authenticate your account and to change sensitive settings.</p>
        <div className={styles.main}>
          <div className={styles.tooltip}>
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
            <p className={styles.crack}>Time to crack: 0 seconds</p>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formWithIcon}>
              <Input
                autoFocus
                name='password'
                label='Password'
                type={inputState ? 'text' : 'password'}
                onKeyPress={this.passwordKeyPressed}
                onChange={this._handleOnChangePassword}
                value={password}
                className={styles.form}
                error={error.password}
                ref={input => { this.password = input }}
              />
              <img src={inputState ? eyeHide : eyeShow} className={styles.icon} onClick={this.toggleRevealPassword} />
            </div>
            <Input
              name='passwordRepeat'
              label='Re-enter Password'
              type={inputState ? 'text' : 'password'}
              onKeyPress={this._handleKeyEnter.bind(this)}
              onChange={this._handleOnChangePasswordRepeat}
              value={passwordRepeat}
              className={styles.form}
              error={error.passwordRepeat}
              ref={input => { this.passwordRepeat = input }}
            />
          </div>
        </div>
        {this._renderButtonRows()}
      </div>
    )
  }
}

export default connect(state => ({
  inputState: state.password.inputState,
  password: state.password.password,
  passwordRepeat: state.password.passwordRepeat,
  validation: state.password.validation,
  username: state.username.username,
  pin: state.pin.pin,
  loader: state.loader,
  error: state.password.error
}))(Password)
