import React, { Component } from 'react'
import { connect } from 'react-redux'

import { validate } from './PasswordValidation/PasswordValidation.middleware'
import { checkPassword, skipPassword } from './Password.middleware'

import {
  passwordNotificationShow,
  showPassword,
  hidePassword,
  changePasswordValue,
  changePasswordRepeatValue
} from './Password.action'


class Password extends Component {

  _handleSubmit = () => {
    this.props.dispatch(
      checkPassword(
        this.props.password,
        this.props.passwordRepeat,
        this.props.validation,
        this.props.username,
        this.props.pinNumber
      )
    )
  }

  _handleBack = () => {
    browserHistory.goBack()
  }

  _handlePasswordNotification = () => {
    this.props.dispatch(passwordNotificationShow())
  }

  _handleSkipPassword = () => {
    this.props.dispatch(skipPassword(this.props.username, this.props.pinNumber))
  }

  _handleOnChangePassword = (password) => {
    this.props.dispatch(changePasswordValue(password))
    this.props.dispatch(validate(password))
  }

  _handleOnChangePasswordRepeat = (passwordRepeat) => {
    this.props.dispatch(changePasswordRepeatValue(passwordRepeat))
  }

  render () {
    return (

        <div>
          <Button type="button" onClick={this._handleBack}>Back</Button>
          <input type="password" name="password" onChange={this._handleOnChangePassword} value={this.props.password} placeholder="Password" />
          <input type="password" name="passwordRepeat" onChange={this._handleOnChangePasswordRepeat} value={this.props.passwordRepeat} placeholder="Re-enter Password" />
          <Button type="button" onClick={this._handleSubmit}>Next</Button>
          <div>
            <h4>Validation</h4>
            <p>{ this.props.validation.upperCaseChar ? 'checkOneUpper' : '' }</p>
            <p>{ this.props.validation.lowerCaseChar ? 'checkOneLower' : '' }</p>
            <p>{ this.props.validation.number ? 'checkOneNumber' : '' }</p>
            <p>{ this.props.validation. ? 'checkCharacterLength' : '' }</p>
          </div>
        </div>


    )
  }
}

export default connect(state => ({

  inputState: state.password.inputState, //not used
  password: state.password.password,
  passwordRepeat: state.password.passwordRepeat,
  validation: state.password.validation,
  username: state.username,
  pinNumber: state.pinNumber,
  loader: state.loader

}))(Password)
