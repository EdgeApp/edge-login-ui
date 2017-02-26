import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'

import Button from 'react-toolbox/lib/button'
import nextButton from 'theme/nextButton.scss'
import Dialog from 'react-toolbox/lib/dialog'
import Link from 'react-toolbox/lib/link'

import { closeForgotPasswordModal } from './ForgotPassword.action'

class ForgotPassword extends Component {

  _handleClose = () => {
    this.props.dispatch(closeForgotPasswordModal())
  }

  _checkLoading = () => {
    if (this.props.visible === true && this.props.loader.loading === false) {
      return true
    } else {
      return false
    }
  }

  actions = [
    { label: t('string_ok'), onClick: this._handleClose }
  ];

  render () {
    if (this._checkLoading()) {
      return (
        <Dialog
          actions={this.actions}
          active={this._checkLoading()}
          onEscKeyDown={this._handleClose}
          onOverlayClick={this._handleClose}
          title={t('activity_recovery_title')}
        >
          <div style={{padding: '10px'}}>
            <p>{t('recovery_not_setup4')}</p>
            <p><a target="_blank" href="https://airbitz.co/app">https://airbitz.co/app</a></p>
            <p>{t('recovery_not_setup5')}</p>
          </div>
        </Dialog>
      )
    }
    if (!this._checkLoading()) return null
  }
}

export default connect(state => ({

  visible: state.forgotPasswordModal,
  loader: state.loader

}))(ForgotPassword)
