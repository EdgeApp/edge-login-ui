import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import {
  closeSuccessModal,
  openSuccessModal
} from '../../Modals/Success/Success.action.js'
import Success from '../../Modals/Success/Success.js'
import { validate } from '../../Signup/Password/PasswordValidation/PasswordValidation.middleware'
import {
  changeNewPasswordRepeatValue,
  changeNewPasswordValue,
  changePasswordHidePassword,
  changePasswordShowPassword,
  clearChangePassword,
  errorChangePassword,
  errorChangePasswordRepeat,
  passwordChanged
} from './ChangePassword.action'
import { checkPassword } from './ChangePassword.middleware'
import Mobile from './ChangePassword.mobile.js'
import Desktop from './ChangePassword.web.js'

class ChangePassword extends Component {
  handleSubmit = () => {
    const callback = error => {
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
    return this.props.dispatch(
      checkPassword(
        this.props.newPassword,
        this.props.newPasswordRepeat,
        this.props.user,
        callback
      )
    )
  }
  handleSuccess = () => {
    this.props.dispatch(closeSuccessModal())
    return this.props.history.push('/account')
  }
  handleOnChangeNewPassword = newPassword => {
    this.props.dispatch(changeNewPasswordValue(newPassword))
    this.props.dispatch(validate(newPassword))
  }
  handleOnChangeNewPasswordRepeat = newPasswordRepeat => {
    this.props.dispatch(changeNewPasswordRepeatValue(newPasswordRepeat))
  }
  passwordKeyPress = e => {
    if (e.charCode === 13) {
      return this.passwordRepeat.getWrappedInstance().focus()
    }
  }
  passwordRepeatKeyPress = e => {
    if (e.charCode === 13) {
      if (!this.props.loader.loading) {
        return this.handleSubmit()
      }
    }
  }
  toggleRevealPassword = e => {
    if (this.props.revealPassword) {
      return this.props.dispatch(changePasswordHidePassword())
    } else {
      return this.props.dispatch(changePasswordShowPassword())
    }
  }
  gotoAccount = () => {
    return this.props.history.push('/account')
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            revealPassword={this.props.revealPassword}
            newPassword={this.props.newPassword}
            newPasswordRepeat={this.props.newPasswordRepeat}
            errorPassword={this.props.errorPassword}
            errorPasswordRepeat={this.props.errorPasswordRepeat}
            loader={this.props.loader.loading}
            validation={this.props.validation}
            handleSubmit={this.handleSubmit}
            passwordKeyPress={this.passwordKeyPress}
            passwordRepeatKeyPress={this.passwordRepeatKeyPress}
            handleOnChangeNewPassword={this.handleOnChangeNewPassword}
            handleOnChangeNewPasswordRepeat={
              this.handleOnChangeNewPasswordRepeat
            }
            refPassword={input => {
              this.password = input
            }}
            refPasswordRepeat={input => {
              this.passwordRepeat = input
            }}
            toggleRevealPassword={this.toggleRevealPassword}
            gotoAccount={this.gotoAccount}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            revealPassword={this.props.revealPassword}
            newPassword={this.props.newPassword}
            newPasswordRepeat={this.props.newPasswordRepeat}
            errorPassword={this.props.errorPassword}
            errorPasswordRepeat={this.props.errorPasswordRepeat}
            loader={this.props.loader.loading}
            validation={this.props.validation}
            handleSubmit={this.handleSubmit}
            passwordKeyPress={this.passwordKeyPress}
            passwordRepeatKeyPress={this.passwordRepeatKeyPress}
            handleOnChangeNewPassword={this.handleOnChangeNewPassword}
            handleOnChangeNewPasswordRepeat={
              this.handleOnChangeNewPasswordRepeat
            }
            refPassword={input => {
              this.password = input
            }}
            refPasswordRepeat={input => {
              this.passwordRepeat = input
            }}
            toggleRevealPassword={this.toggleRevealPassword}
            gotoAccount={this.gotoAccount}
          />
        </MediaQuery>
        <Success
          header="Password successfully changed"
          close={this.handleSuccess}
        />
      </section>
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
