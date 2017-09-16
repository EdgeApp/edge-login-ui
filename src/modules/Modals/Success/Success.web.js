import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../BaseModal.web.js'
import styles from './Success.webStyle.scss'
import check from '../../../img/modals/success-W.png'

class PasswordRecovery extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={this.props.close}
        icon={check}
      >
        <p className={styles.header}>{this.props.header}</p>
        <button className={styles.primary} onClick={this.props.close} autoFocus >Close</button>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.success
}))(PasswordRecovery)
