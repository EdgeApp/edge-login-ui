import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon';
import { selectUserToLogin, setCachedUsers } from './CachedUsers/CachedUsers.action'

import Loader from './Loader/Loader.web'
import ErrorModal from './ErrorModal/ErrorModal.web'
import WarningModal from './WarningModal/WarningModal.web'
import abcctx from 'lib/web/abcContext'
import LayoutTemplate from './LayoutTemplate/LayoutTemplate.web'
import layoutTheme from 'theme/layoutTheme'
import { openLogin, closeUserList } from './Login/Login.action'
import { showContainerNotification, hideContainerNotification } from './Container.action'
import Snackbar from 'react-toolbox/lib/snackbar'
import t from 'lib/web/LocaleStrings'

import styles from './Container.style.scss'

class Container extends Component {

  _handleToggle = () => {
    if(this.props.edgeObject) {
      this.props.edgeObject.cancelRequest()
    }
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
  }
  loadData () {
     
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      const listedUsers = ctx.listUsernames()
      var cachedUsers = listedUsers.slice(0)
      for (var index in listedUsers) {
        let enabled = ctx.pinLoginEnabled(listedUsers[index])
        if(enabled === false) {
          cachedUsers.splice(index, 1)
        }
      }
      const lastUser = window.localStorage.getItem('lastUser')
      dispatch(setCachedUsers(cachedUsers)) 
      if(listedUsers.length >= 1) {
        if(cachedUsers.includes(lastUser)) {
          dispatch(selectUserToLogin(lastUser)) 
        } else {
          dispatch(openLogin()) 
        }
      } 
    })
  }

  _handleNotificationClose = () => {
    return this.props.dispatch(hideContainerNotification())
  }

  _renderNotification = (errorString) => {
    const { containerNotification, dispatch } = this.props
    return <Snackbar
      action='Dismiss'
      active={containerNotification}
      label={t(errorString)}
      timeout={5000}
      type='accept'
      onClick={this._handleNotificationClose}
      onTimeout={this._handleNotificationClose} />
  }

  componentWillMount () {
    this.loadData()
  } 

  render () {   
    return (
      <div className='app'>
        <Dialog
          active
          onEscKeyDown={this._handleToggle}
          onOverlayClick={this._handleToggle}
          className={styles.topLevelDialog}
        >
          <LayoutTemplate theme={layoutTheme}>
            <FontIcon value='clear' className={styles.exitTooltip} onClick={this._handleToggle}/>
            {this.props.children}
          </LayoutTemplate>

          <Loader />
          <ErrorModal />
          <WarningModal />
        </Dialog>
        {this._renderNotification('error_filler')}
      </div>
    )
  }
}


export default connect(state => ({

  loader: state.loader,
  edgeObject: state.login.edgeLoginResults,
  containerNotification: state.container.containerNotification

}))(Container)