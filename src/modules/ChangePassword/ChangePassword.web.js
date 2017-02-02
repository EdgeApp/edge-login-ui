import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import { validate } from '../Password/PasswordValidation/PasswordValidation.middleware'
import { showPasswordView, changeOldPasswordValue, changeNewPasswordValue, changeNewPasswordRepeatValue, hidePasswordChangedNotification } from './ChangePassword.action'
import { checkPassword } from './ChangePassword.middleware'
import Snackbar from 'react-toolbox/lib/snackbar'

class ChangePassword extends Component {

  _handleSubmit = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      checkPassword(
        this.props.oldPassword,
        this.props.newPassword,
        this.props.newPasswordRepeat,
        this.props.validation,
        this.props.user,
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

  _renderNotification = () => {
    const { passwordChangedNotification, dispatch } = this.props
    return <Snackbar
      action='Dismiss'
      active={passwordChangedNotification}
      label={t('activity_signup_password_change_good')}
      timeout={5000}
      type='accept'
      onClick={() => dispatch(hidePasswordChangedNotification())}
      onTimeout={() => dispatch(hidePasswordChangedNotification())} />
  }

  render () {
    const { view, oldPassword, newPassword, validation, newPasswordRepeat } = this.props
    const { upperCaseChar, lowerCaseChar, number, characterLength } = validation

    if (this.props.view) {
      return (
        <div>
          {this._renderNotification()}
          <div>
            <div>
              <input type='password' name='oldPassword' onChange={this._handleOnChangeOldPassword} value={oldPassword} placeholder='Old Password' />
            </div>
            <div>
              <input type='password' name='newPassword' onChange={this._handleOnChangeNewPassword} value={newPassword} placeholder='New Password' />
            </div>
            <div>
              <input type='password' name='newPasswordRepeat' onChange={this._handleOnChangeNewPasswordRepeat} value={newPasswordRepeat} placeholder='Confirm New Password' />
            </div>
            <div>
              <button type='button' onClick={this._handleSubmit}>Submit</button>
            </div>
          </div>
          <div>
            <p>{ upperCaseChar ? '' : t('password_rule_no_uppercase') }</p>
            <p>{ lowerCaseChar ? '' : t('password_rule_no_lowercase') }</p>
            <p>{ number ? '' : t('password_rule_no_number') }</p>
            <p>{ characterLength ? '' : t('password_rule_too_short') }</p>
          </div>
        </div>
      )
    }
    if (!view) {
      return (
        <div>
          {this._renderNotification()}
          <button type='button' onClick={this._handleShowChangePassword}>Show</button>
        </div>
      )
    }
  }
}

export default connect(state => ({

  view: state.changePassword.view,
  oldPassword: state.changePassword.oldPassword,
  newPassword: state.changePassword.newPassword,
  newPasswordRepeat: state.changePassword.newPasswordRepeat,
  passwordChangedNotification: state.changePassword.passwordChangedNotification,
  validation: state.password.validation,
  user: state.user
}))(ChangePassword)
