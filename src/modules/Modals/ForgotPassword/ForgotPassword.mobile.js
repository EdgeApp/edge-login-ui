import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../BaseModal.mobile.js'
import styles from './ForgotPassword.mobileStyle.scss'

import { closeForgotPasswordModal } from './ForgotPassword.action.js'

import recoveryIcon from '../../../img/modals/recovery-modal-MW.png'

class PasswordRecovery extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={e => this.props.dispatch(closeForgotPasswordModal())}
        icon={recoveryIcon}
      >
        <p className={styles.header}>Password Recovery</p>
        <p className={styles.text}>
          If recovery was setup, you should have emailed yourself a recovery token with a link.
          To recover your account, install the Airbitz Mobile App on iOS or Android at: <br />
          <a target='_blank' href='https://airbitz.co/app' className={styles.linked}>https://airbitz.co/app</a>
        </p>
        <br />
        <p className={styles.text}>
          Then click one of the links in the recovery email from a device with Airbitz installed.
        </p>
        <button className={styles.close} onClick={e => this.props.dispatch(closeForgotPasswordModal())}>Ok</button>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.forgotPassword
}))(PasswordRecovery)
