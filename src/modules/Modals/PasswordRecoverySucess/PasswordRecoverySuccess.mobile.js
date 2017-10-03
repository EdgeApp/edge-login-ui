import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../BaseModal.mobile.js'
import styles from './PasswordRecoverySuccess.mobileStyle.scss'

import { closePasswordRecoverySuccessModal } from './PasswordRecoverySuccess.action.js'

import recoverySetupIcon from '../../../img/modals/recovery-setup-MW.png'

class PasswordRecovery extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={e => this.props.dispatch(closePasswordRecoverySuccessModal())}
        icon={recoverySetupIcon}
      >
        <p className={styles.header}>Password Recovery email sent!</p>
        <p className={styles.text}>
          Please retain the email as you will need it to recover the password. Use the link in the email to recover your account if your password is lost or forgotten.
        </p>
        <button className={styles.primaryMobile} onClick={this.props.finish}>Done</button>
        <p className={styles.cancel}>
          Didn’t get an email or need to send it again?
        </p>
        <p className={styles.linked} onClick={e => this.props.dispatch(closePasswordRecoverySuccessModal())}>Go back to the previous screen</p>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.passwordRecoverySuccess
}))(PasswordRecovery)
