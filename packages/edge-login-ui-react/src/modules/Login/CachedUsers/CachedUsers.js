import classnames from 'classnames'
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontIcon from 'react-toolbox/lib/font_icon'

import { loginUsername } from '../../Login/Login.action'
import {
  closeAccountCacheDeleteModal,
  openAccountCacheDeleteModal
} from '../../Modals/AccountCacheDelete/AccountCacheDelete.action.js'
import AccountCacheDelete from '../../Modals/AccountCacheDelete/AccountCacheDelete.js'
import {
  selectUserToDeleteFromUserCache,
  selectUserToLogin
} from './CachedUsers.action'
import { deleteUserToCache } from './CachedUsers.middleware.js'
import styles from './CachedUsers.scss'

class UserList extends Component {
  _handleLoginUser = user => {
    if (this.props.area === 'pinLogin') {
      this.props.dispatch(selectUserToLogin(user))
    } else {
      if (this.props.cachedUsersWithPinEnabled.includes(user)) {
        this.props.dispatch(selectUserToLogin(user))
      } else {
        this.props.dispatch(loginUsername(user))
      }
    }
  }
  _handleOpenDeleteUserCacheModal = user => {
    this.props.dispatch(selectUserToDeleteFromUserCache(user))
    return this.props.dispatch(openAccountCacheDeleteModal())
  }
  _handleDeleteUserFromCache = user => {
    this.props.dispatch(deleteUserToCache(this.props.userToDeleteFromUserCache))
    return this.props.dispatch(closeAccountCacheDeleteModal())
  }
  render () {
    const renderValue = (item, idx) => {
      const userItemclassName = classnames(
        styles.useritem,
        item === this.props.selectedUserToLogin ? styles.useritemSelected : null
      )

      return (
        <li key={idx} className={styles.userList}>
          <div className={styles.userrows}>
            <span
              className={userItemclassName}
              onMouseDown={e => this._handleLoginUser(item)}
            >
              {item}
            </span>
            <span
              className={styles.userdelete}
              onMouseDown={e => this._handleOpenDeleteUserCacheModal(item)}
            >
              <FontIcon value="clear" />
            </span>
          </div>
        </li>
      )
    }

    const userList =
      this.props.area === 'pinLogin'
        ? this.props.cachedUsersWithPinEnabled
        : this.props.users

    const containerClassname = classnames(
      { [styles.active]: this.props.showCachedUsers },
      styles.dropdown,
      this.props.containerClassName
    )

    return (
      <div data-react-toolbox="dropdown" className={containerClassname}>
        {this.props.component}
        <ul className={classnames(this.props.userListClassName, styles.values)}>
          {_.map(userList, renderValue)}
        </ul>
        <AccountCacheDelete delete={this._handleDeleteUserFromCache} />
      </div>
    )
  }
}

export default connect(state => ({
  users: state.cachedUsers.users,
  selectedUserToLogin: state.cachedUsers.selectedUserToLogin,
  cachedUsersWithPinEnabled: state.cachedUsers.usersWithPinEnabled,
  showCachedUsers: state.login.showCachedUsers,
  userToDeleteFromUserCache: state.cachedUsers.userToDeleteFromUserCache
}))(UserList)
