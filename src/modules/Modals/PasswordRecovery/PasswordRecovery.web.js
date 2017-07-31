import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../BaseModal.web.js'
// import styles from './PasswordRecovery.webStyle.scss'

class PasswordRecovery extends Component {
  render () {
    return (
      <Modal
        active={this.props.active}
        close={this.props.close}
        icon='../../../../assets/modals/recovery-W.png'
      >
        <p>test</p>
      </Modal>
    )
  }
}

export default connect()(PasswordRecovery)
