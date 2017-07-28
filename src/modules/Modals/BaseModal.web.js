import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'react-toolbox/lib/dialog'
import styles from './BaseModal.webStyle.scss'

class BaseModal extends Component {

  render () {
      return (
        <Dialog
          className={styles.container}
          active={this.props.active}
          onEscKeyDown={this.props.close}
          onOverlayClick={this.props.close}
        >
          <div></div>
          {this.props.children}
        </Dialog>
      )
    }
}

export default connect()(BaseModal)
