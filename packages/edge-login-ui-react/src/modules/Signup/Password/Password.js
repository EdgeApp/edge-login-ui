import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { getDetails } from '../ReviewDetails/ReviewDetails.action'
import { changeSignupPage } from '../Signup.action'
import {
  changePasswordRepeatValue,
  changePasswordValue,
  clearPasswordError,
  errorPasswordRepeatValue,
  errorPasswordValue,
  hidePassword,
  showPassword
} from './Password.action'
import { checkPassword } from './Password.middleware'
import Mobile from './Password.mobile.js'
import Desktop from './Password.web.js'
import { validate } from './PasswordValidation/PasswordValidation.middleware'

class Password extends Component {
  handleSubmit = () => {
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
    return this.props.dispatch(
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
  passwordKeyPressed = e => {
    if (e.charCode === 13) {
      this.passwordRepeat.getWrappedInstance().focus()
    }
  }
  passwordRepeatKeyPressed = e => {
    if (e.charCode === 13) {
      return this.handleSubmit()
    }
  }
  handleOnChangePassword = password => {
    this.props.dispatch(changePasswordValue(password))
    this.props.dispatch(validate(password))
  }
  handleOnChangePasswordRepeat = passwordRepeat => {
    this.props.dispatch(changePasswordRepeatValue(passwordRepeat))
  }
  toggleRevealPassword = () => {
    if (this.props.inputState) {
      return this.props.dispatch(hidePassword())
    } else {
      return this.props.dispatch(showPassword())
    }
  }
  gotoPin = () => {
    return this.props.dispatch(changeSignupPage('pin'))
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            inputState={this.props.inputState}
            password={this.props.password}
            passwordRepeat={this.props.passwordRepeat}
            validation={this.props.validation}
            error={this.props.error}
            loader={this.props.loader.loading}
            handleSubmit={this.handleSubmit}
            refPassword={input => {
              this.password = input
            }}
            refPasswordRepeat={input => {
              this.passwordRepeat = input
            }}
            passwordKeyPressed={this.passwordKeyPressed}
            passwordRepeatKeyPressed={this.passwordRepeatKeyPressed}
            handleOnChangePassword={this.handleOnChangePassword}
            handleOnChangePasswordRepeat={this.handleOnChangePasswordRepeat}
            toggleRevealPassword={this.toggleRevealPassword}
            gotoPin={this.gotoPin}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            inputState={this.props.inputState}
            password={this.props.password}
            passwordRepeat={this.props.passwordRepeat}
            validation={this.props.validation}
            error={this.props.error}
            loader={this.props.loader.loading}
            handleSubmit={this.handleSubmit}
            refPassword={input => {
              this.password = input
            }}
            refPasswordRepeat={input => {
              this.passwordRepeat = input
            }}
            passwordKeyPressed={this.passwordKeyPressed}
            passwordRepeatKeyPressed={this.passwordRepeatKeyPressed}
            handleOnChangePassword={this.handleOnChangePassword}
            handleOnChangePasswordRepeat={this.handleOnChangePasswordRepeat}
            toggleRevealPassword={this.toggleRevealPassword}
            gotoPin={this.gotoPin}
          />
        </MediaQuery>
      </section>
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
