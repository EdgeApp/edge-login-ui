import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeAccountManagementModal } from './AccountManagementPassword.action.js'

import Modal from '../BaseModal.web.js'
import styles from './AccountManagementPassword.webStyle.scss'

import passwordIcon from '../../../img/account-settings/password-W.png'

class AccountManagementPassword extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={() => this.props.dispatch(closeAccountManagementModal())}
        icon={passwordIcon}
      >
        <p className={styles.header}>Enter your password to make changes to your account settings</p>
        <div className={styles.password}>
          <input type='password' required='required' />
          <label className={styles['control-label']} htmlFor='input'>Your Current Password</label>
          <i className={styles.bar} />
        </div>
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={e => this.props.dispatch(closeAccountManagementModal())}>Cancel</button>
          <button className={styles.primary} onClick={e => this.props.dispatch(closeAccountManagementModal())}>Done</button>
        </div>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountManagementPassword
}))(AccountManagementPassword)
