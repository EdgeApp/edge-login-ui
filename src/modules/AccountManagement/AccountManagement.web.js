import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './AccountManagement.webStyle.scss'
// import t from 'lib/web/LocaleStrings'

import EnterPassword from '../Modals/AccountManagementPassword/AccountManagementPassword.web.js'

import { openAccountManagementModal } from '../Modals/AccountManagementPassword/AccountManagementPassword.action.js'

import pinIcon from '../../img/account-settings/PIN-W.png'
import passwordIcon from '../../img/account-settings/password-W.png'
import recoveryIcon from '../../img/account-settings/recovery-W.png'

class AccountManager extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Account name: { this.props.account.username }</p>
        <div className={styles.main}>
          <div className={styles.square} onClick={e => this.props.dispatch(openAccountManagementModal('/changepin'))}>
            <img src={pinIcon} />
            <p className={styles.label}>Change Pin</p>
          </div>
          <div className={styles.square} onClick={e => this.props.dispatch(openAccountManagementModal('/changepassword'))}>
            <img src={passwordIcon} />
            <p className={styles.label}>Change Password</p>
          </div>
          <div className={styles.square} onClick={e => this.props.dispatch(openAccountManagementModal('/passwordrecovery'))}>
            <img src={recoveryIcon} />
            <p className={styles.label}>Setup / Change<br />Password Recovery</p>
          </div>
        </div>
        <EnterPassword history={this.props.history} />
      </div>
    )
  }
}

export default connect(state => ({ account: state.user }))(AccountManager)
