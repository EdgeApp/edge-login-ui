import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeAccountCreatedModal } from './AccountCreated.action.js'

import Modal from '../BaseModal.web.js'
import styles from './AccountCreated.webStyle.scss'

import successIcon from '../../../img/modals/success-W.png'

class AccountManagementPassword extends Component {
  render () {
    const name = window.parent.abcui.vendorName || window.abcui.vendorName
    return (
      <Modal
        active={this.props.view}
        close={() => this.props.dispatch(closeAccountCreatedModal())}
        icon={successIcon}
      >
        <div className={styles.container}>
          <p className={styles.header}>Account created!</p>
          <p className={styles.p1}>Your {name} account has been created.</p>
          <p className={styles.p2}>Your username and password are known only to you and cannot be reset by Augur.</p>
          <p className={styles.p3}>Would you like to set up password recovery questions to reset your account in case of a forgotten password?</p>
          <div className={styles.rowButtons}>
            <button className={styles.secondary} onClick={this.props.cancel}>I'll do it later</button>
            <button className={styles.primary} onClick={this.props.submit}>Setup Recovery</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountCreated
}))(AccountManagementPassword)
