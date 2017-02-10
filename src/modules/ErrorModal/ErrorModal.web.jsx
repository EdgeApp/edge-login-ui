import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'

import Button from 'react-toolbox/lib/button'
import nextButton from 'theme/nextButton.scss'
import Dialog from 'react-toolbox/lib/dialog'

import { closeErrorModal } from './ErrorModal.action'

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
  handleToggle = () => {
    // this.props.dispatch(hideLoading())
  }

  actions = [
    { label: 'Ok', onClick: this.handleToggle }
  ];

  render () {
    if (this._checkLoading()) {
      return (
        <Dialog style={{zIndex: 2}}
          action={this.actions}
          active={this._checkLoading()}>
          <div style={{padding: '10px'}}>
            <p>{this.props.message}</p>
            <Button raised theme={nextButton} type='button' onClick={this._handleClose}>{t('string_ok')}</Button>
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
