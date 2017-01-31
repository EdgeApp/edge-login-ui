import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import { validate } from '../Password/PasswordValidation/PasswordValidation.middleware'
import { showPasswordView, changeOldPasswordValue, changeNewPasswordValue, changeNewPasswordRepeatValue } from './ChangePassword.action'
import { checkPassword } from './ChangePassword.middleware'
import Snackbar from 'react-toolbox/lib/snackbar';

class ChangePassword extends Component {

  state = {
    showNotify: false
  }

  componentWillReceiveProps(nextProps) {
    const { newPassword, view } = nextProps;

    if (newPassword && !view) {
      this.setState({showNotify: true})
    } else {
      this.setState({showNotify: false})
    }
  }

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

  _handleSnackbarTimeout = () => {
    this.setState({ showNotify: false });
  };

  _handleSnackbarClick = () => {
    this.setState({ showNotify: false });
  };

  _renderNotification = () => {
    const { showNotify } = this.state
    return <Snackbar
       action='Dismiss'
       active={showNotify}
       label={ t('activity_signup_password_change_good') }
       timeout={5000}
       type='cancel'
       onClick={this._handleSnackbarClick}
       onTimeout={this._handleSnackbarTimeout}>
     </Snackbar>
  }

  render () {
    const { view, oldPassword, newPassword, validation } = this.props
    const { upperCaseChar, lowerCaseChar, number, characterLength } = validation

    if(this.props.view){
      return (
        <div>
          {this._renderNotification()}
          <div>
            <div>
              <input type="password" name="oldPassword" onChange={this._handleOnChangeOldPassword} value={oldPassword} placeholder="Old Password" />
            </div>
            <div>
              <input type="password" name="newPassword" onChange={this._handleOnChangeNewPassword} value={newPassword} placeholder="New Password" />
            </div>
            <div>
              <input type="password" name="newPasswordRepeat" onChange={this._handleOnChangeNewPasswordRepeat} value={this.props.newPasswordRepeat} placeholder="Confirm New Password" />
            </div>
            <div>
              <button type="button" onClick={this._handleSubmit}>Submit</button>
            </div>
          </div>
          <div>
            <p>{ upperCaseChar ? '' : t('password_rule_no_uppercase') }</p>
            <p>{ lowerCaseChar ? '' : t('password_rule_no_lowercase') }</p>
            <p>{ number ? '' : t('password_rule_no_number') }</p>
            <p>{ characterLength ? '' :  t('password_rule_too_short') }</p>
          </div>
        </div>
      )
    }
    if(!view){
      return (
        <div>
          {this._renderNotification()}
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
  user                : state.user,

}) )(ChangePassword)
