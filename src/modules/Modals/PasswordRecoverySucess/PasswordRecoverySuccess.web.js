import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../BaseModal.web.js'
import styles from './PasswordRecoverySuccess.webStyle.scss'

import { closePasswordRecoverySuccessModal } from './PasswordRecoverySuccess.action.js'

import recoverySetupIcon from '../../../img/modals/recovery-setup-W.png'

class PasswordRecovery extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={e => this.props.dispatch(closePasswordRecoverySuccessModal())}
        icon={recoverySetupIcon}
      >
        <p className={styles.header}>Password Recovery Setup complete!</p>
        <p className={styles.text}>
          Please ensure you retain a copy of the email you sent to yourself. Use the link in the email to recover your account if your password is forgotten.
        </p>
        <button className={styles.primary} onClick={this.props.finish}>Done</button>
        <p className={styles.cancel}>
          Didn’t get an email or need to send it again?
          <br />
          <span className={styles.link} onClick={e => this.props.dispatch(closePasswordRecoverySuccessModal())}>Go back to the previous screen</span>
        </p>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.passwordRecoverySuccess
}))(PasswordRecovery)
