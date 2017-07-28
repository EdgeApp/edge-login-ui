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
      >
        <h1>test</h1>
      </Modal>
    )
  }
}

export default connect()(PasswordRecovery)
