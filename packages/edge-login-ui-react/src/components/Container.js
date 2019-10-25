import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

import { openLogin } from '../actions/Login.action'
import {
  selectUserToLogin,
  setCachedUsers,
  setCachedUsersWithPin
} from '../actions/LoginCachedUsers.action'
import Notification from '../connectors/Notification.connector'
import { lastUser } from '../lib/helper'
import styles from '../styles/Container.scss'
import Layout from './Layout'

Modal.setAppElement('#app')

const findUsernamesWithPin = (ctx, usernames) => {
  const promises = usernames.map(username => ctx.pinLoginEnabled(username))
  return Promise.all(promises).then(bools =>
    usernames.filter((_, i) => bools[i])
  )
}

class Container extends Component {
  _handleToggle = () => {
    if (this.props.edgeObject) {
      this.props.edgeObject.cancelRequest()
    }
    if (window.abcui.exitCallback) {
      return window.abcui.exitCallback()
    }
  }

  loadData() {
    const dispatch = this.props.dispatch
    const ctx = window.abcui.abcuiContext
    return ctx.listUsernames().then(cachedUsers => {
      return findUsernamesWithPin(ctx, cachedUsers).then(cachedUsersWithPin => {
        const lastUserStorage = window.localStorage.getItem(lastUser)
        dispatch(setCachedUsersWithPin(cachedUsersWithPin))
        dispatch(setCachedUsers(cachedUsers))
        if (cachedUsers.length >= 1) {
          if (lastUserStorage && cachedUsersWithPin.includes(lastUserStorage)) {
            return dispatch(selectUserToLogin(lastUserStorage))
          } else {
            return dispatch(openLogin())
          }
        }
        return null
      })
    })
  }

  componentWillMount() {
    this.loadData()
  }

  render() {
    return (
      <div className="app">
        <Notification />
        <Modal
          isOpen
          shouldCloseOnEsc
          onRequestClose={this._handleToggle}
          overlayClassName={styles.modalOverlay}
          className={styles.modalContainer}
        >
          <Layout location={this.props.location}>{this.props.children}</Layout>
        </Modal>
      </div>
    )
  }
}

export default connect(state => ({
  loader: state.loader,
  signupPage: state.signupPage,
  edgeObject: state.login.edgeLoginResults
}))(Container)
