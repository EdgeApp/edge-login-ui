import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { showPasswordView, changeOldPasswordValue, changeNewPasswordValue, changeNewPasswordRepeatValue } from './ChangePassword.action'

class ChangePassword extends Component {

  _handleSubmit = () => {
  }

  _handleShowChangePassword = (e) => {
    this.props.dispatch(showPasswordView())
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
    if(this.props.view){
      return (
        <div>
          <input type="password" name="oldPassword" onChange={this._handleOnChangeOldPassword} value={this.props.oldPassword} placeholder="Old Password" />	
          <input type="password" name="newPassword" onChange={this._handleOnChangeNewPassword} value={this.props.newPassword} placeholder="New Password" />	
          <input type="password" name="newPasswordRepeat" onChange={this._handleOnChangeNewPasswordRepeat} value={this.props.newPasswordRepeat} placeholder="Confirm New Password" />	
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
  newPasswordRepeat   : state.changePassword.newPasswordRepeat

}) )(ChangePassword)
