import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { openAccountManagementModal } from '../Modals/AccountManagementPassword/AccountManagementPassword.action.js'
import { userLogin } from '../Login/Login.action'
import EnterPassword from '../Modals/AccountManagementPassword/AccountManagementPassword.js'
import Desktop from './AccountManagement.web.js'
import Mobile from './AccountManagement.mobile.js'

class AccountManager extends Component {
  componentWillMount () {
    const abcuiCallback = window.parent.abcui
    if (abcuiCallback.abcAccount) {
      this.props.dispatch(userLogin(window.parent.abcui.abcAccount))
    }
  }
  gotoChangePin = () => {
    return this.props.dispatch(openAccountManagementModal('/changepin'))
  }
  gotoChangePassword = () => {
    return this.props.dispatch(openAccountManagementModal('/changepassword'))
  }
  gotoChangePasswordRecovery = () => {
    return this.props.dispatch(openAccountManagementModal('/passwordrecovery'))
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            account={this.props.account}
            gotoChangePin={this.gotoChangePin}
            gotoChangePassword={this.gotoChangePassword}
            gotoChangePasswordRecovery={this.gotoChangePasswordRecovery}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            account={this.props.account}
            gotoChangePin={this.gotoChangePin}
            gotoChangePassword={this.gotoChangePassword}
            gotoChangePasswordRecovery={this.gotoChangePasswordRecovery}
          />
        </MediaQuery>
        <EnterPassword history={this.props.history} />
      </section>
    )
  }
}

export default connect(state => ({ account: state.user }))(AccountManager)
