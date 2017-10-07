import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeAccountCreatedModal } from './AccountCreated.action.js'

import Modal from '../BaseModal.mobile.js'
import styles from './AccountCreated.mobileStyle.scss'

import successIcon from '../../../img/modals/success-MW.png'

class AccountManagementPassword extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={() => this.props.dispatch(closeAccountCreatedModal())}
        icon={successIcon}
      >
        <p className={styles.header}>Account created!</p>
        <p className={styles.heavy}>Your username and password are known only to you and cannot be reset by Augur.</p>
        <p className={styles.text}>Would you like to set up password recovery questions to reset your account in case of a forgotten password?</p>
        <div className={styles.customButtons}>
          <button className={styles.secondaryMobile} onClick={this.props.cancel}>I'll do it later</button>
          <button className={styles.primaryMobile} onClick={this.props.submit}>Setup Recovery</button>
        </div>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountCreated
}))(AccountManagementPassword)
