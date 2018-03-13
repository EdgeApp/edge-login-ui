import abcctx from 'lib/web/abcContext'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { Dialog } from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import layoutTheme from 'theme/layoutTheme'

import styles from './Container.scss'
import Layout from './Layout/Layout.js'
import {
  selectUserToLogin,
  setCachedUsers,
  setCachedUsersWithPin
} from './Login/CachedUsers/CachedUsers.action'
import { openLogin } from './Login/Login.action'

const findUsernamesWithPin = (ctx, usernames) => {
  const promises = usernames.map(username => ctx.pinLoginEnabled(username))
  return Promise.all(promises).then(bools =>
    usernames.filter((username, i) => bools[i])
  )
}

class Container extends Component {
  _handleToggle = () => {
    const abcuiCallback = window.parent.abcui
    if (abcuiCallback.exitCallback) {
      if (this.props.edgeObject) {
        this.props.edgeObject.cancelRequest()
      }
      return abcuiCallback.exitCallback()
    }
  }
  loadData () {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      return ctx.listUsernames().then(cachedUsers => {
        return findUsernamesWithPin(ctx, cachedUsers).then(
          cachedUsersWithPin => {
            const lastUser = window.localStorage.getItem('lastUser')
            dispatch(setCachedUsersWithPin(cachedUsersWithPin))
            dispatch(setCachedUsers(cachedUsers))
            if (cachedUsers.length >= 1) {
              if (lastUser && cachedUsersWithPin.includes(lastUser)) {
                return dispatch(selectUserToLogin(lastUser))
              } else {
                return dispatch(openLogin())
              }
            }
            return null
          }
        )
      })
    })
  }
  componentWillMount () {
    this.loadData()
  }
  selectDialogHeight = pathname => {
    const checkSignupPage = () => {
      switch (this.props.signupPage) {
        case 'pin':
          return styles.dialogSignUpPin
        case 'password':
          return styles.dialogPassword
        case 'review':
          return styles.dialogPassword
        default:
          return styles.dialogSignUp
      }
    }
    switch (pathname) {
      case '/account':
        return styles.dialogAccount
      case '/signup':
        return checkSignupPage()
      case '/changepin':
        return styles.dialogPin
      case '/changepassword':
        return styles.dialogChangePassword
      case '/passwordrecovery':
        return styles.dialogPasswordRecovery
      case '/passwordrecoverytoken':
        return styles.dialogPasswordRecoveryToken
      default:
        return styles.dialogLogin
    }
  }
  render () {
    return (
      <div className="app">
        <MediaQuery minWidth={720}>
          <Dialog
            active
            onEscKeyDown={this._handleToggle}
            onOverlayClick={this._handleToggle}
            className={this.selectDialogHeight(this.props.location.pathname)}
          >
            <Layout theme={layoutTheme} location={this.props.location}>
              <FontIcon
                value="clear"
                className={styles.exitTooltip}
                onClick={this._handleToggle}
              />
              {this.props.children}
            </Layout>
          </Dialog>
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Dialog
            active
            onEscKeyDown={this._handleToggle}
            onOverlayClick={this._handleToggle}
            className={styles.mobileWidth}
          >
            <Layout theme={layoutTheme} location={this.props.location}>
              <FontIcon
                value="clear"
                className={styles.exitTooltip}
                onClick={this._handleToggle}
              />
              {this.props.children}
            </Layout>
          </Dialog>
        </MediaQuery>
      </div>
    )
  }
}

export default connect(state => ({
  loader: state.loader,
  signupPage: state.signupPage,
  edgeObject: state.login.edgeLoginResults
}))(Container)
