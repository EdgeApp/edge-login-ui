import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from 'lib/web/LocaleStrings'
import Dialog from 'react-toolbox/lib/dialog'

import { closeWarningModal } from './WarningModal.action'
import { deleteUserToCache } from '../CachedUsers/CachedUsers.middleware'

import neutralButtons from 'theme/neutralButtons.scss'
import warningButtons from 'theme/warningButtons.scss'

import styles from './WarningModal.webStyle'

class WarningModal extends Component {
  _handleDeleteUsersFromCache = () => {
    this.props.dispatch(
      deleteUserToCache(
        this.props.userToDeleteFromUserCache
      )
    )
  }

  _checkHandleSubmit = () => {
    switch (this.props.module) {
      case 'deleteCachedUser' :
        return this._handleDeleteUsersFromCache()

      default:
        return null
    }
  }

  _handleHideModal = () => {
    this.props.dispatch(closeWarningModal())
  }

  buttons = [
    { label: t('string_delete'), onClick: this._checkHandleSubmit, theme: warningButtons, raised: true, className: styles.warningButton },
    { label: t('string_cancel'), onClick: this._handleHideModal, theme: neutralButtons }
  ]

  render () {
    return (
      <Dialog
        actions={this.buttons}
        active={this.props.visible}
        onEscKeyDown={this._handleHideModal}
        onOverlayClick={this._handleHideModal}
        title={this.props.title}
      >
        <div className={styles.text}>{ this.props.message }</div>
      </Dialog>
    )
  }
}

export default connect(state => ({
  visible: state.warningModal.visible,
  module: state.warningModal.module,
  title: state.warningModal.title,
  message: state.warningModal.message,
  userToDeleteFromUserCache: state.cachedUsers.userToDeleteFromUserCache
}))(WarningModal)
