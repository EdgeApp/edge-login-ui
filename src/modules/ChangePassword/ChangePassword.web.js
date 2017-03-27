import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import FontIcon from 'react-toolbox/lib/font_icon';
import t from '../../lib/web/LocaleStrings'

import { validate } from '../Password/PasswordValidation/PasswordValidation.middleware'
import { hidePasswordView, showPasswordView, changePasswordHidePassword, changePasswordShowPassword, changeOldPasswordValue, changeNewPasswordValue, changeNewPasswordRepeatValue, hidePasswordChangedNotification, showPasswordChangedNotification } from './ChangePassword.action'
import { checkPassword } from './ChangePassword.middleware'
import Snackbar from 'react-toolbox/lib/snackbar'
import Input from 'react-toolbox/lib/input'
import Dialog from 'react-toolbox/lib/dialog'

import neutralButtons from 'theme/neutralButtons.scss'
import primaryButtons from 'theme/primaryButtons.scss'
import styles from './ChangePassword.webstyle'

class ChangePassword extends Component {

  _handleSubmit = () => {
    const callback = (error) => {
      if(!error){
        this.props.dispatch(hidePasswordView())
        this.props.dispatch(showPasswordChangedNotification())
      }
    }
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

  _handleOnChangeOldPassword = (oldPassword) => {
    this.props.dispatch(changeOldPasswordValue(oldPassword))
  }

  _handleOnChangeNewPassword = (newPassword) => {
    this.props.dispatch(changeNewPasswordValue(newPassword))
    this.props.dispatch(validate(newPassword))
  }

  _handleOnChangeNewPasswordRepeat = (newPasswordRepeat) => {
    this.props.dispatch(changeNewPasswordRepeatValue(newPasswordRepeat))
  }

  _handleHideModal = () => {
    this.props.dispatch(hidePasswordView())
  }

  _handleNotificationClose = () => {
    return this.props.dispatch(hidePasswordChangedNotification())
  }

  toggleRevealPassword = (e) => {
    if (this.props.revealPassword) {
      return this.props.dispatch(changePasswordHidePassword())
    } else {
      return this.props.dispatch(changePasswordShowPassword())
    }
  }

  buttons = [
    { label: "Submit", onClick: this._handleSubmit, theme: primaryButtons, raised: true, primary: true },
    { label: "Close", onClick: this._handleHideModal, theme: neutralButtons}
  ]

  _renderNotification = () => {
    const { passwordChangedNotification, dispatch } = this.props
    return <Snackbar
      action='Dismiss'
      active={passwordChangedNotification}
      label={t('activity_signup_password_change_good')}
      timeout={5000}
      type='accept'
      onClick={this._handleNotificationClose}
      onTimeout={this._handleNotificationClose} />
  }

  render () {
    const { view, oldPassword, newPassword, validation, newPasswordRepeat } = this.props
    const { upperCaseChar, lowerCaseChar, number, characterLength } = validation
    return (
      <div>
        <Dialog
          actions={this.buttons}
          active={this.props.view}
          onEscKeyDown={this._handleHideModal}
          onOverlayClick={this._handleHideModal}
          title={t('activity_signup_password_change_title')}
        >
          <div>
            <Input type={ this.props.revealPassword ? 'text' : 'password' } name='oldPassword' onChange={this._handleOnChangeOldPassword} value={oldPassword} label='Old Password' />
            <FontIcon value={this.props.revealPassword ? 'visibility' : 'visibility_off'} onClick={this.toggleRevealPassword} className={styles.inputPasswordFieldImg}/>
          </div>
          <Input type={ this.props.revealPassword ? 'text' : 'password' } name='newPassword' onChange={this._handleOnChangeNewPassword} value={newPassword} label='New Password' />
          <Input type={ this.props.revealPassword ? 'text' : 'password' } name='newPasswordRepeat' onChange={this._handleOnChangeNewPasswordRepeat} value={newPasswordRepeat} label='Confirm New Password' />
          <div>
            <p className={styles.passwordRequirement}>
              <FontIcon value={upperCaseChar ? 'done' : 'clear'} className={upperCaseChar ? styles.green : styles.red}/>
              { t('password_rule_no_uppercase') }
            </p>
            <p className={styles.passwordRequirement}>
              <FontIcon value={lowerCaseChar ? 'done' : 'clear'} className={lowerCaseChar ? styles.green : styles.red}/>
              { t('password_rule_no_lowercase') }
            </p>
            <p className={styles.passwordRequirement}>
              <FontIcon value={number ? 'done' : 'clear'} className={number ? styles.green : styles.red}/>
              { t('password_rule_no_number') }
            </p>
            <p className={styles.passwordRequirement}>
              <FontIcon value={characterLength ? 'done' : 'clear'} className={characterLength ? styles.green : styles.red}/>
              { t('password_rule_too_short') }
            </p>
          </div>
        </Dialog>
        {this._renderNotification()}
      </div>
    )
  }
}

export default connect(state => ({

  view: state.changePassword.view,
  revealPassword: state.changePassword.revealPassword,
  oldPassword: state.changePassword.oldPassword,
  newPassword: state.changePassword.newPassword,
  newPasswordRepeat: state.changePassword.newPasswordRepeat,
  passwordChangedNotification: state.changePassword.passwordChangedNotification,
  validation: state.password.validation,
  user: state.user

}))(ChangePassword)
