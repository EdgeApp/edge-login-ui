import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './AccountManagement.mobileStyle.scss'
// import t from 'lib/web/LocaleStrings'

import EnterPassword from '../Modals/AccountManagementPassword/AccountManagementPassword.web.js'

// import { openAccountManagementModal } from '../Modals/AccountManagementPassword/AccountManagementPassword.action.js'
import { userLogin } from '../Login/Login.action'

import pinIcon from '../../img/account-settings/PIN-MW.png'
import passwordIcon from '../../img/account-settings/password-MW.png'
import recoveryIcon from '../../img/account-settings/recovery-MW.png'

class AccountManager extends Component {
  componentWillMount () {
    const abcuiCallback = window.parent.abcui
    if (abcuiCallback.abcAccount) {
      this.props.dispatch(
        userLogin(window.parent.abcui.abcAccount)
      )
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>
          Account name:
        </p>
        <p className={styles.accountName}>
          { this.props.account.username }
        </p>
        <div className={styles.square}>
          <img src={pinIcon} />
          <p className={styles.label}>Change Pin</p>
        </div>
        <div className={styles.square}>
          <img src={passwordIcon} />
          <p className={styles.label}>Change Password</p>
        </div>
        <div className={styles.square}>
          <img src={recoveryIcon} />
          <p className={styles.label}>Setup/Change Password Recovery</p>
        </div>
        <EnterPassword history={this.props.history} />
      </div>
    )
  }
}

export default connect(state => ({ account: state.user }))(AccountManager)
