import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import { validate } from '../Password/PasswordValidation/PasswordValidation.middleware'
import { showPasswordView, changeOldPasswordValue, changeNewPasswordValue, changeNewPasswordRepeatValue } from './ChangePassword.action'
import { checkPassword } from './ChangePassword.middleware'

class ChangePassword extends Component {

  _handleSubmit = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      checkPassword(
        this.props.oldPassword,
        this.props.newPassword,
        this.props.newPasswordRepeat,
        this.props.validation,
        callback
      )
    )
  }

  _handleShowChangePassword = (e) => {
    this.props.dispatch(showPasswordView())
  }

  _handleOnChangeOldPassword = (e) => {
    const oldPassword = e.target.value
    this.props.dispatch(changeOldPasswordValue(oldPassword))
  }

  _handleOnChangeNewPassword = (e) => {
    const newPassword = e.target.value
    this.props.dispatch(changeNewPasswordValue(newPassword))
    this.props.dispatch(validate(newPassword))
  }

  _handleOnChangeNewPasswordRepeat = (e) => {
    const newPasswordRepeat = e.target.value
    this.props.dispatch(changeNewPasswordRepeatValue(newPasswordRepeat))
  }

  render () {
    if(this.props.view){
      return (
        <div>
          <div>
            <div>
              <input type="password" name="oldPassword" onChange={this._handleOnChangeOldPassword} value={this.props.oldPassword} placeholder="Old Password" />	
            </div>
            <div>
              <input type="password" name="newPassword" onChange={this._handleOnChangeNewPassword} value={this.props.newPassword} placeholder="New Password" />	
            </div>
            <div>
              <input type="password" name="newPasswordRepeat" onChange={this._handleOnChangeNewPasswordRepeat} value={this.props.newPasswordRepeat} placeholder="Confirm New Password" />	
            </div>
            <div>
              <button type="button" onClick={this._handleSubmit}>Submit</button> 
            </div>
          </div>
          <div>
            <p>{ this.props.validation.upperCaseChar ? '' : t('password_rule_no_uppercase') }</p>
            <p>{ this.props.validation.lowerCaseChar ? '' : t('password_rule_no_lowercase') }</p>
            <p>{ this.props.validation.number ? '' : t('password_rule_no_number') }</p>
            <p>{ this.props.validation.characterLength ? '' :  t('password_rule_too_short') }</p>
          </div>
        </div>
      )
    }
    if(!this.props.view){
      return (
        <div>
          <button type="button" onClick={this._handleShowChangePassword}>Show</button>
        </div>
      )
    }
  }
}

export default connect( state => ({

  view                : state.changePassword.view,
  oldPassword         : state.changePassword.oldPassword,
  newPassword         : state.changePassword.newPassword,
  newPasswordRepeat   : state.changePassword.newPasswordRepeat,
  validation          : state.password.validation,

}) )(ChangePassword)
