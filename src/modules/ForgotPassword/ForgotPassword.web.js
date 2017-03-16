import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import Link from 'react-toolbox/lib/link'

import { closeForgotPasswordModal } from './ForgotPassword.action'

import nextButton from 'theme/nextButton.scss'
import styles from './ForgotPassword.webStyle'

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

  render () {
    if (this._checkLoading()) {
      return (
        <Dialog
          active={this._checkLoading()}
          onEscKeyDown={this._handleClose}
          onOverlayClick={this._handleClose}
          title={t('activity_recovery_title')}
        >
          <div>
            <p>{t('recovery_not_setup4')}</p>
            <br />
            <p><a target="_blank" href="https://airbitz.co/app">https://airbitz.co/app</a></p>
            <br />
            <p>{t('recovery_not_setup5')}</p>
            <br />
          </div>
          <div className={styles.button}>
            <Button type='button' onClick={this._handleClose}>{t('string_ok')}</Button>
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
