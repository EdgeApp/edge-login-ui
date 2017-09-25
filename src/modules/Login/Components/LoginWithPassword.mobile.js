import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './LoginWithPassword.mobileStyle.scss'
// import Input from 'react-toolbox/lib/input'

import {
  // loginUsername,
  // loginPassword,
  openUserList,
  closeUserList,
  showMobileLoginEdgeView
} from '../Login.action.js'
// import PasswordRecovery from '../../Modals/PasswordRecovery/PasswordRecovery.web.js'
// import CachedUsers from '../../CachedUsers/CachedUsers.web.js'

// import { openPasswordRecoveryModal } from '../../Modals/PasswordRecovery/PasswordRecovery.action.js'

class LoginWithPasswordMobile extends Component {
  _usernameKeyPress = (e) => {
    if (e.charCode === 13) {
      return this.password.getWrappedInstance().focus()
    }
  }
  _passwordKeyPress = (e) => {
    if (e.charCode === 13) {
      if (!this.props.loader.loading) {
        return this.props.login(this.props.username, this.props.password)
      }
    }
  }
  _showCachedUsers = () => {
    this.props.dispatch(openUserList())
    this.pin.getWrappedInstance().blur()
  }
  _hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
    this.pin.getWrappedInstance().focus()
  }
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.navBox} onClick={e => this.props.dispatch(showMobileLoginEdgeView())}>
            <p className={styles.text}>
              Edge Login
            </p>
          </div>
          <div className={styles.navBoxActive}>
            <p className={styles.text}>
              Username Login
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  username: state.login.username,
  password: state.login.password,
  loader: state.loader,
  error: state.login.error
}))(LoginWithPasswordMobile)
