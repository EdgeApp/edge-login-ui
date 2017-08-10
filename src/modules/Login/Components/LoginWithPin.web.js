import React, { Component } from 'react'
import { connect } from 'react-redux'

import CachedUsers from '../../CachedUsers/CachedUsers.web.js'
import { openUserList, closeUserList } from '../Login.action'

import styles from './LoginWithPin.webStyle.scss'
import Input from 'react-toolbox/lib/input'

class LoginWithPin extends Component {
  _showCachedUsers = () => {
    this.props.dispatch(openUserList())
  }
  _hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
  }
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.background} />
        <div className={styles.main}>
          <p className={styles.header}>Login with your PIN</p>
          <div className={styles.box}>
            <CachedUsers
              component={
                <Input
                  onFocus={this._showCachedUsers}
                  onBlur={this._hideCachedUsers}
                  className={styles.userList}
                />
              }
              area='pinLogin'
              containerClassName={styles.cachedUsers}
              userListClassName={styles.userListClassName}
            />
            <div className={styles.password}>
              <input type='password' style={{ textAlign: 'center' }}required='required' />
              <label className={styles.passwordLabel} htmlFor='input'>Enter PIN</label>
              <i className={styles.bar} />
            </div>
          </div>
          <p className={styles.exitLink} onClick={this.props.openViewPassword}>Exit PIN Login</p>
        </div>
      </div>
    )
  }
}

export default connect()(LoginWithPin)
