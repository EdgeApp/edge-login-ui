import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from 'lib/web/LocaleStrings'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'

import { closeWarningModal } from './WarningModal.action'
import { deleteUserToCache } from '../CachedUsers/CachedUsers.middleware'

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
    { label: t('string_cancel'), onClick: this._handleHideModal, className: styles.cancelButton },
    { label: t('string_ok'), onClick: this._checkHandleSubmit, raised: true, className: styles.warningButton }
  ]

  render () {
    console.log(this.props)
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

const style = {

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px',
    padding: '20px',
    width: '300px'
  },

  textWarning: {
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '10px'
  },

  textLead: {
    fontWeight: 'bold',
    fontSize: '18px'
  },

  hideModal: {
    marginTop: '15px',
    marginHorizontal: '10px',
    fontSize: '18px',
    textAlign: 'center'
  }
}

export default connect(state => ({
  visible: state.warningModal.visible,
  module: state.warningModal.module,
  title: state.warningModal.title,
  message: state.warningModal.message,
  userToDeleteFromUserCache: state.cachedUsers.userToDeleteFromUserCache
}))(WarningModal)
