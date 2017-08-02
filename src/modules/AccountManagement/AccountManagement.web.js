import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './AccountManagement.webStyle.scss'
// import t from 'lib/web/LocaleStrings'

// import ChangePin from '../ChangePin/ChangePin.web'
// import ChangePassword from '../ChangePassword/ChangePassword.web'
// import PasswordRecovery from '../PasswordRecovery/PasswordRecovery.web'
// import PasswordRecoverySuccess from '../PasswordRecovery/PasswordRecoverySuccess.web'
import EnterPassword from '../Modals/AccountManagementPassword/AccountManagementPassword.web.js'

import { openAccountManagementModal } from '../Modals/AccountManagementPassword/AccountManagementPassword.action.js'

class AccountManager extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Account name: AirbitzAugur</p>
        <div className={styles.main}>
          <div className={styles.square} onClick={e => this.props.dispatch(openAccountManagementModal())}>
            <img src="../../../assets/account-settings/PIN-W.png" />
            <p className={styles.label}>Change Pin</p>
          </div>
          <div className={styles.square} onClick={e => this.props.dispatch(openAccountManagementModal())}>
            <img src="../../../assets/account-settings/password-W.png" />
            <p className={styles.label}>Change Password</p>
          </div>
          <div className={styles.square} onClick={e => this.props.dispatch(openAccountManagementModal())}>
            <img src="../../../assets/account-settings/recovery-W.png" />
            <p className={styles.label}>Setup / Change<br />Password Recovery</p>
          </div>
          <EnterPassword />
        </div>
      </div>
    )
  }
}

export default connect()(AccountManager)
