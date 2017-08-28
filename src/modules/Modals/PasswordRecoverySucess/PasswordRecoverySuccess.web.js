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
          Please ensure you retain a copy of the email you sent to yourself. Use the link in the email to recover yoru account if your password is forgotten.
        </p>
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={e => this.props.dispatch(closePasswordRecoverySuccessModal())}>Email More</button>
          <button className={styles.primary} onClick={this.props.finish}>Finish</button>
        </div>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.passwordRecoverySuccess
}))(PasswordRecovery)
