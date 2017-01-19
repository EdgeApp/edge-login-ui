import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { changeOldPasswordValue, changeNewPasswordValue, changeNewPasswordRepeatValue } from './ChangePassword.action'

class ChangePassword extends Component {

  _handleSubmit = () => {
  }

  _handlePasswordNotification = () => {
    this.refs.signupPasswordFirst.getWrappedInstance().blur()
    this.refs.signupPassword.getWrappedInstance().blur()    
    this.props.dispatch(passwordNotificationShow())
  }

  _handleOnChangeOldPassword = (e) => {
    const oldPassword = e.target.value
    this.props.dispatch(changeOldPasswordValue(oldPassword))
    // this.props.dispatch(validate(password))
  }

  _handleOnChangeNewPassword = (e) => {
    const newPassword = e.target.value
    this.props.dispatch(changeNewPasswordValue(newPassword))
  }

  _handleOnChangeNewPasswordRepeat = (e) => {
    const newPasswordRepeat = e.target.value
    this.props.dispatch(changeNewPasswordRepeatValue(newPasswordRepeat))
  }
  render () {
    return (
		<div>
			<input type="password" name="oldPassword" onChange="this._handleOnChangeOldPassword" value={this.props.oldPassword} placeholder="Old Password">	
			<input type="password" name="newPassword" onChange="this._handleOnChangeOldPassword" value={this.props.newPassword} placeholder="New Password">	
			<input type="password" name="newPasswordRepeat" onChange="this._handleOnChangeOldPassword" value={this.props.newPasswordRepeat} placeholder="Confirm New Password" >	
		</div>
	)
  }
}

export default connect( state => ({

  view                : state.changePassword.view,
  oldPassword         : state.changePassword.oldPassword,
  newPassword         : state.changePassword.newPassword,
  newPasswordRepeat   : state.changePassword.newPasswordRepeat

}) )(ChangePassword)
