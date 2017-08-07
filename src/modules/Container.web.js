import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import { selectUserToLogin, setCachedUsers, setCachedUsersWithPin } from './CachedUsers/CachedUsers.action'

import Loader from './Loader/Loader.web'
import ErrorModal from './ErrorModal/ErrorModal.web'
import WarningModal from './WarningModal/WarningModal.web'
import abcctx from 'lib/web/abcContext'
import LayoutTemplate from './LayoutTemplate/LayoutTemplate.web'
import layoutTheme from 'theme/layoutTheme'
import { openLogin } from './Login/Login.action'
import { hideContainerNotification } from './Container.action'
import Snackbar from 'react-toolbox/lib/snackbar'

import styles from './Container.style.scss'

function findUsernamesWithPin (ctx, usernames) {
  const promises = usernames.map(username => ctx.pinLoginEnabled(username))
  return Promise.all(promises).then(bools =>
    usernames.filter((username, i) => bools[i]))
}

class Container extends Component {
  _handleToggle = () => {
    if (this.props.edgeObject) {
      this.props.edgeObject.cancelRequest()
    }
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
  }

  loadData () {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      return ctx.listUsernames().then(cachedUsers => {
        return findUsernamesWithPin(ctx, cachedUsers).then(cachedUsersWithPin => {
          const lastUser = window.localStorage.getItem('lastUser')
          dispatch(setCachedUsersWithPin(cachedUsersWithPin))
          dispatch(setCachedUsers(cachedUsers))
          if (cachedUsers.length >= 1) {
            if (lastUser && cachedUsersWithPin.includes(lastUser)) {
              dispatch(selectUserToLogin(lastUser))
            } else {
              dispatch(openLogin())
            }
          }
          return null
        })
      })
    })
  }

  _handleNotificationClose = () => {
    return this.props.dispatch(hideContainerNotification())
  }

  _renderNotification = (string, notificationType = null) => {
    const { containerNotification } = this.props
    return <Snackbar
      action='Dismiss'
      active={containerNotification}
      label={string}
      className={styles[notificationType]}
      timeout={5000}
      type='accept'
      onClick={this._handleNotificationClose}
      onTimeout={this._handleNotificationClose} />
  }

  componentWillMount () {
    this.loadData()
  }

  selectDialogHeight = (pathname) => {
    switch (pathname) {
      case '/account':
        return styles.dialogAccount
      case '/changepin':
        return styles.dialogAccount
      case '/changepassword':
        return styles.dialogChangePassword
      case '/passwordrecovery':
        return styles.dialogPasswordRecovery
      default:
        return styles.dialogLogin
    }
  }

  render () {
    return (
      <div className='app'>
        <Dialog
          active
          onEscKeyDown={this._handleToggle}
          onOverlayClick={this._handleToggle}
          className={this.selectDialogHeight(this.props.location.pathname)}
        >
          <LayoutTemplate theme={layoutTheme}>
            <FontIcon value='clear' className={styles.exitTooltip} onClick={this._handleToggle} />
            {this.props.children}
          </LayoutTemplate>
          <Loader />
          <ErrorModal />
          <WarningModal />
        </Dialog>
        {this._renderNotification(this.props.containerNotificationValues.text, this.props.containerNotificationValues.notificationType)}
      </div>
    )
  }
}

export default connect(state => ({

  loader: state.loader,
  edgeObject: state.login.edgeLoginResults,
  containerNotification: state.container.containerNotification,
  containerNotificationValues: state.container.containerNotificationValues

}))(Container)
