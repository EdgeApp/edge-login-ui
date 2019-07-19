import React, { Component } from 'react'
import { IoMdClose } from 'react-icons/io'

import styles from '../styles/LoginCachedUsers.scss'

export default class LoginCachedUsers extends Component {
  loginUsername = user => {
    const { cachedUsersWithPinEnabled } = this.props
    this.props.loginUsername({ user, cachedUsersWithPinEnabled })
  }
  render () {
    return (
      <div className={styles.container}>
        {this.props.users.map((user, index) => {
          return (
            <div className={styles.row} key={index}>
              <div
                className={styles.usernameContainer}
                onClick={() => this.loginUsername(user)}
              >
                <p className={styles.username}>{user}</p>
              </div>
              <div
                className={styles.iconContainer}
                onClick={() => this.props.selectUserToDeleteFromUserCache(user)}
              >
                <IoMdClose className={styles.icon} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
