import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'react-toolbox/lib/dialog'
import styles from './BaseModal.mobileStyle.scss'

class BaseModal extends Component {
  render () {
    return (
      <Dialog
        className={styles.container}
        active={this.props.active}
        onEscKeyDown={this.props.close}
        onOverlayClick={this.props.close}
      >
        <div className={styles.circle}>
          <img src={this.props.icon} />
        </div>
        <div className={styles.main}>
          {this.props.children}
        </div>
      </Dialog>
    )
  }
}

export default connect()(BaseModal)
