import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'

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

  render () {
    if(this._checkLoading()){
      return (
        <div>
          <h5>Error</h5>
          <p>{this.props.message}</p>   
          <button type="button" onClick={this._handleClose}>{t('string_ok')}</button> 
        </div>
      )
    }
    if(!this._checkLoading()) return null
  }
}

export default connect(state => ({

  visible: state.errorModal.visible,
  message: state.errorModal.message,
  loader: state.loader

}))(ErrorModal)
