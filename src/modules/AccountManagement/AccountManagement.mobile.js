import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './AccountManagement.webStyle.scss'
// import t from 'lib/web/LocaleStrings'

import EnterPassword from '../Modals/AccountManagementPassword/AccountManagementPassword.web.js'

// import { openAccountManagementModal } from '../Modals/AccountManagementPassword/AccountManagementPassword.action.js'
import { userLogin } from '../Login/Login.action'

// import pinIcon from '../../img/account-settings/PIN-W.png'
// import passwordIcon from '../../img/account-settings/password-W.png'
// import recoveryIcon from '../../img/account-settings/recovery-W.png'

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
          <span className={styles.heavy}>Account name:</span>
          <br />
          { this.props.account.username }
        </p>
        <EnterPassword history={this.props.history} />
      </div>
    )
  }
}

export default connect(state => ({ account: state.user }))(AccountManager)
