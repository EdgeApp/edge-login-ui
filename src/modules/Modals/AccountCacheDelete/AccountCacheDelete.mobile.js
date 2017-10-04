import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../BaseModal.mobile.js'
import styles from './AccountCacheDelete.mobileStyle.scss'

import { closeAccountCacheDeleteModal } from './AccountCacheDelete.action.js'

import deleteIcon from '../../../img/modals/delete-MW.png'

class AccountCacheDelete extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={e => this.props.dispatch(closeAccountCacheDeleteModal())}
        icon={deleteIcon}
      >
        <p className={styles.header}>Delete Account</p>
        <p className={styles.text}>
          Delete <span className={styles.heavy}>{this.props.name}</span> on this device only? This will remove the 2FA and PIN access from this device.
          If 2FA is enabled on this account, you will be unable to access this account for 7 days from new devices.
        </p>
        <div className={styles.rowButtonsMobile}>
          <button className={styles.secondaryMobile} onClick={e => this.props.dispatch(closeAccountCacheDeleteModal())}>Cancel</button>
          <button className={styles.primaryMobile} onClick={this.props.delete}>Delete</button>
        </div>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.accountCacheDelete,
  name: state.cachedUsers.userToDeleteFromUserCache
}))(AccountCacheDelete)
