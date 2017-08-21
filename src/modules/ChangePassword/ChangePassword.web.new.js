import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from './ChangePassword.webstyle.scss'
import Input from 'react-toolbox/lib/input'
import FontIcon from 'react-toolbox/lib/font_icon'

import { validate } from '../Password/PasswordValidation/PasswordValidation.middleware'
// import { checkPassword } from './ChangePassword.middleware'
import {
  changePasswordHidePassword,
  changePasswordShowPassword,
  changeNewPasswordValue,
  changeNewPasswordRepeatValue
} from './ChangePassword.action'

import eyeShow from '../../img/create-account/show-password.png'
import eyeHide from '../../img/create-account/hide-password.png'

class ChangePin extends Component {
  _handleOnChangeNewPassword = (newPassword) => {
    this.props.dispatch(changeNewPasswordValue(newPassword))
    this.props.dispatch(validate(newPassword))
  }

  _handleOnChangeNewPasswordRepeat = (newPasswordRepeat) => {
    this.props.dispatch(changeNewPasswordRepeatValue(newPasswordRepeat))
  }
  toggleRevealPassword = (e) => {
    if (this.props.revealPassword) {
      return this.props.dispatch(changePasswordHidePassword())
    } else {
      return this.props.dispatch(changePasswordShowPassword())
    }
  }
  render () {
    const { revealPassword, validation, newPassword, newPasswordRepeat } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.tooltip}>
            <p className={styles.textHeader}>Password Requirements:</p>
            <p className={styles.text}>
              {validation.upperCaseChar ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
              Must have at least one upper case letter
            </p>
            <p className={styles.text}>
              {validation.lowerCaseChar ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
              Must have at least one lower case letter
            </p>
            <p className={styles.text}>
              {validation.number ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
              Must have at least one number
            </p>
            <p className={styles.text}>
              {validation.characterLength ? <FontIcon value='done' className={styles.check} /> : <span className={styles.bullet}>•</span>}
              Must have at least 10 characters
            </p>
            <p className={styles.crack}>Time to crack: 0 seconds</p>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formWithIcon}>
              <Input
                type={this.props.revealPassword ? 'text' : 'password'}
                onChange={this._handleOnChangeNewPassword}
                value={newPassword}
                label='Password'
                className={styles.form}
              />
              <img src={revealPassword ? eyeHide : eyeShow} className={styles.icon} onClick={this.toggleRevealPassword} />
            </div>
            <Input
              type={this.props.revealPassword ? 'text' : 'password'}
              onChange={this._handleOnChangeNewPasswordRepeat}
              label='Re-enter Password'
              className={styles.form}
              value={newPasswordRepeat}
            />
          </div>
        </div>
        <div className={styles.rowButtons}>
          <Link to='/account'>
            <button className={styles.secondary}>Back</button>
          </Link>
          <button className={styles.primary}>Submit</button>
        </div>
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
}))(ChangePin)
