import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from './AccountManagement.webStyle.scss'
// import t from 'lib/web/LocaleStrings'

// import ChangePin from '../ChangePin/ChangePin.web'
// import ChangePassword from '../ChangePassword/ChangePassword.web'
// import PasswordRecovery from '../PasswordRecovery/PasswordRecovery.web'
// import PasswordRecoverySuccess from '../PasswordRecovery/PasswordRecoverySuccess.web'
import EnterPassword from '../Modals/AccountManagementPassword/AccountManagementPassword.web.js'

import { openAccountManagementModal } from '../Modals/AccountManagementPassword/AccountManagementPassword.action.js'

import pinIcon from '../../img/account-settings/PIN-W.png'
import passwordIcon from '../../img/account-settings/password-W.png'
import recoveryIcon from '../../img/account-settings/recovery-W.png'

class AccountManager extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Account name: AirbitzAugur</p>
        <div className={styles.main}>
          <Link to='/changepin'>
            <div className={styles.square}>
              <img src={pinIcon} />
              <p className={styles.label}>Change Pin</p>
            </div>
          </Link>
          <Link to='/changepassword'>
            <div className={styles.square}>
              <img src={passwordIcon} />
              <p className={styles.label}>Change Password</p>
            </div>
          </Link>
          <div className={styles.square} onClick={e => this.props.dispatch(openAccountManagementModal())}>
            <img src={recoveryIcon} />
            <p className={styles.label}>Setup / Change<br />Password Recovery</p>
          </div>
          <EnterPassword />
        </div>
      </div>
    )
  }
}

export default connect()(AccountManager)
