import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { validate } from './PasswordValidation/PasswordValidation.middleware'
import { checkPassword, skipPassword } from './Password.middleware'

import Loader from '../Loader/Loader.web'
import ErrorModal from '../ErrorModal/ErrorModal.web'
import SkipPassword from './Notification.web'

import {
  passwordNotificationShow,
  showPassword,
  hidePassword,
  changePasswordValue,
  changePasswordRepeatValue
} from './Password.action'


class Password extends Component {

  _handleSubmit = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      checkPassword(
        this.props.password,
        this.props.passwordRepeat,
        this.props.validation,
        this.props.username,
        this.props.pinNumber,
        callback
      )
    )
  }

  _handleBack = () => {
    browserHistory.goBack()
  }

  _handlePasswordNotification = () => {
    this.props.dispatch(passwordNotificationShow())
  }

  handleSubmitSkipPassword = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      skipPassword(
        this.props.username, 
        this.props.pinNumber,
        callback
      )
    )
  }

  _handleOnChangePassword = (e) => {
    const password = e.target.value
    this.props.dispatch(changePasswordValue(password))
    this.props.dispatch(validate(password))
  }

  _handleOnChangePasswordRepeat = (e) => {
    const passwordRepeat = e.target.value
    this.props.dispatch(changePasswordRepeatValue(passwordRepeat))
  }

  render () {
    return (
      <div>
        <div>
          <button type="button" onClick={this._handleBack}>Back</button>
          <input type="password" name="password" onChange={this._handleOnChangePassword} value={this.props.password} placeholder="Password" />
          <input type="password" name="passwordRepeat" onChange={this._handleOnChangePasswordRepeat} value={this.props.passwordRepeat} placeholder="Re-enter Password" />
          <button type="button" onClick={this._handleSubmit}>Next</button>
          <button type="button" onClick={this._handlePasswordNotification}>Skip</button>
          <div>
            <h4>Validation</h4>
            <p>{ !this.props.validation.upperCaseChar ? 'checkOneUpper' : '' }</p>
            <p>{ !this.props.validation.lowerCaseChar ? 'checkOneLower' : '' }</p>
            <p>{ !this.props.validation.number ? 'checkOneNumber' : '' }</p>
            <p>{ !this.props.validation.characterLength ? 'checkCharacterLength' : '' }</p>
          </div>
        </div>
        <Loader />
        <ErrorModal />
        <SkipPassword handleSubmit={this.handleSubmitSkipPassword}/>
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
