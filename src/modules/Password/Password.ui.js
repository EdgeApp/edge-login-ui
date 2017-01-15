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

import { MKTextField } from 'react-native-material-kit'
const unselected = require('../../img/btn_unselected.png')
const selected = require('../../img/Green-check.png')

class Password extends Component {

  handleBack = () => {
    if (this.props.loader.loading === true) {
      return true
    }
    Actions.landing()
    return true
  }
  componentWillMount = () => {
    Actions.refresh({onLeft: this.handleBack})
  }

  _checkOneUpper = (validation) => validation.upperCaseChar ? selected : unselected
  _checkOneLower = (validation) => validation.lowerCaseChar ? selected : unselected
  _checkOneNumber = (validation) => validation.number ? selected : unselected
  _checkCharacterLength = (validation) => validation.characterLength ? selected : unselected

  handleSubmit = () => {
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
  handlePasswordNotification = () => {
    this.refs.SignupPasswordFirst.blur()
    this.refs.SignupPassword.blur()
    this.props.dispatch(passwordNotificationShow())
  }

  handleSkipPassword = () => {
    this.props.dispatch(skipPassword(this.props.username, this.props.pinNumber))
  }

  handlePasswordOnFocus = () => {
    this.refs.passwordValidation.transitionTo({height: 90}, 200)
  }

  handlePasswordOnBlur = () => {
    this.refs.passwordValidation.transitionTo({height: 0}, 200)
  }

  _handleOnChangePassword = (password) => {
    this.props.dispatch(changePasswordValue(password))
    this.props.dispatch(validate(password))
  }

  _handleOnChangePasswordRepeat = (passwordRepeat) => {
    this.props.dispatch(changePasswordRepeatValue(passwordRepeat))
  }

  toggleRevealPassword = () => {
    if (this.props.inputState) {
      this.props.dispatch(hidePassword())
    } else {
      this.props.dispatch(showPassword())
    }
  }

  render () {
    return (

        <div>
          <Button type="button">Back</Button>
          <input type="password" name="password" onChange={this._handleOnChangePassword} value={this.props.password} placeholder="Password" />
          <input type="password" name="passwordRepeat" onChange={this._handleOnChangePasswordRepeat} value={this.props.passwordRepeat} placeholder="Re-enter Password" />
          <Button type="button" onClick={this._handleSubmit}>Next</Button>
          <div>
            <h4>Validation</h4>
            <p>{ this._checkOneUpper ? 'checkOneUpper' : '' }</p>
            <p>{ this._checkOneLower ? 'checkOneLower' : '' }</p>
            <p>{ this._checkOneNumber ? 'checkOneNumber' : '' }</p>
            <p>{ this._checkCharacterLength ? 'checkCharacterLength' : '' }</p>
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
