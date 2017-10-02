import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input'

import {
  changeAccountManagementPasswordModalPassword,
  closeAccountManagementModal,
  errorAccountManagementModal,
  clearAccountManagementModal
} from './AccountManagementPassword.action.js'
import { checkPassword } from './AccountManagementPassword.middleware.js'

import Modal from '../BaseModal.mobile.js'
import styles from './AccountManagementPassword.mobileStyle.scss'
import passwordIcon from '../../../img/account-settings/password-MW.png'

class AccountManagementPassword extends Component {
  _handleClose = () => {
    this.props.dispatch(clearAccountManagementModal())
    this.props.dispatch(changeAccountManagementPasswordModalPassword(''))
    return this.props.dispatch(closeAccountManagementModal())
  }
  _handleSubmit = () => {
    const callback = (error) => {
      if (error) {
        this.props.dispatch(clearAccountManagementModal())
        return this.props.dispatch(errorAccountManagementModal(error))
      }
      if (!error) {
        this.props.history.push(this.props.route)
        return this._handleClose()
      }
    }
    this.props.dispatch(
      checkPassword(
        this.props.password,
        this.props.user,
        callback
      )
    )
  }
  _passwordKeyPressed = (e) => {
    if (e.charCode === 13) {
      return this._handleSubmit()
    }
  }
  _renderButtonRows = () => {
    if (!this.props.loader.loading) {
      return (
        <div className={styles.customRow}>
          <button className={styles.secondaryMobile} onClick={this._handleClose}>Cancel</button>
          <button className={styles.primaryMobile} onClick={this._handleSubmit}>Done</button>
        </div>
      )
    }
    if (this.props.loader.loading) {
      return (
        <div className={styles.customRow}>
          <button className={styles.secondaryLoadMobile}>Back</button>
          <button className={styles.primaryLoadMobile}><div className={styles.loader} /></button>
        </div>
      )
    }
  }
  render () {
    return (
      <Modal
        active={this.props.view}
        close={this._handleClose}
        icon={passwordIcon}
      >
        <p className={styles.header}>Enter your password to make changes to your account settings</p>
        <Input
          autoFocus
          type='password'
          onKeyPress={this._passwordKeyPressed}
          onChange={value => this.props.dispatch(changeAccountManagementPasswordModalPassword(value))}
          value={this.props.password}
          label='Your Current Password'
          className={styles.password}
          error={this.props.error}
        />
        {this._renderButtonRows()}
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountManagementPassword.view,
  password: state.modal.accountManagementPassword.password,
  route: state.modal.accountManagementPassword.route,
  error: state.modal.accountManagementPassword.error,
  loader: state.loader,
  user: state.user
}))(AccountManagementPassword)
