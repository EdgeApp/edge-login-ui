import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'
import abcctx from '../../lib/web/abcContext'

import { passwordRecoveryDone } from './PasswordRecovery.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { checkEmail } from './PasswordRecovery.middleware'
import ErrorModal from '../ErrorModal/ErrorModal.web'

export default class PasswordRecovery extends Component {

  _handleSubmit = (address) => {
    const callback = url => {
      window.open(url, '_blank')
    }
    this.props.dispatch(
      checkEmail(
        address,
        this.props.email,
        this.props.token,
        this.props.username,
        callback
      )
    )
  }

  _handleClose = () => {
    this.props.dispatch(openErrorModal(t('recovery_setup_successful')))
    this.props.dispatch(passwordRecoveryDone())
  }

  _renderFinishButton = () => {
    if(this.props.finishButton){
      return (
        <div>
          <button type="button" onClick={this._handleClose}>Done</button>
        </div>
      )
    }else{
      return null
    }
  }

  render () {
    return (
      <div>
        <p>{t('save_recovery_token_popup')}</p>
        <p>{t('save_recovery_token_popup_message')}</p>
        <div>
          <input type="email" name="" onChange={this.props.handleOnChangeEmail} value={this.props.email} placeholder="Email Address"/>
        </div>
        <div>
          <button type="button" onClick={() => this._handleSubmit('google')}>Send using Gmail</button>
        </div>
        <div>
          <button type="button" onClick={() => this._handleSubmit('yahoo')}>Send using Yahoo</button>
        </div>
        <div>
          <button type="button" onClick={() => this._handleSubmit('microsoft')}>Send using Hotmail, Outlook, Live Mail</button>
        </div>
        <div>
          <button type="button" onClick={() => this._handleSubmit('generic')}>Send using Email App</button>
        </div>
        {this._renderFinishButton()}
        <ErrorModal />
      </div>
    )
  }
}
