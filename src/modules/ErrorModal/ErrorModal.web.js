import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'

import Button from 'react-toolbox/lib/button'
import nextButton from 'theme/nextButton.scss'
import Dialog from 'react-toolbox/lib/dialog'

import { closeErrorModal } from './ErrorModal.action'

import styles from './ErrorModal.webStyle'

class ErrorModal extends Component {

  _handleClose = () => {
    this.props.dispatch(closeErrorModal())
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
        <Dialog className={styles.dialogZIndex}
          active={this._checkLoading()}
        >
          <div className={styles.container}>
            <p>{this.props.message}</p>
            <br />
            <Button raised primary className={styles.button} type='button' onClick={this._handleClose}>{t('string_ok')}</Button>
          </div>
        </Dialog>
      )
    }
    if (!this._checkLoading()) return null
  }
}

export default connect(state => ({

  visible: state.errorModal.visible,
  message: state.errorModal.message,
  loader: state.loader

}))(ErrorModal)
