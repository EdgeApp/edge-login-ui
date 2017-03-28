import React, { Component } from 'react'
import t from '../../lib/web/LocaleStrings'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import { showPasswordRecoveryFinishModal, passwordRecoveryDone } from './PasswordRecovery.action'
import { checkEmail } from './PasswordRecovery.middleware'
import passwordRecoveryStyles from './PasswordRecovery.webStyle.scss'

export default class PasswordRecoveryToken extends Component {
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
    this.props.dispatch(showPasswordRecoveryFinishModal())
    this.props.dispatch(passwordRecoveryDone())
  }

  _renderFinishButton = () => {
    if (this.props.finishButton) {
      return (
        <div>
          <Button type='button' raised primary style={{margin: '10px 0px 10px 0px'}} onClick={this._handleClose}>Done</Button>
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <div>
        <h6>{t('save_recovery_token_popup')}</h6>
        <br />
        <p>{t('save_recovery_token_popup_message')}</p>
        <div>
          <Input type='email' onChange={this.props.handleOnChangeEmail} value={this.props.email} label='Email Address' required/>
        </div>
        <div>
          <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } onClick={() => this._handleSubmit('google')}>Send using Gmail</Button>
        </div>
        <div>
          <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } onClick={() => this._handleSubmit('yahoo')}>Send using Yahoo</Button>
        </div>
        <div>
          <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } onClick={() => this._handleSubmit('microsoft')}>Send using Hotmail, Outlook, Live Mail</Button>
        </div>
        <div>
          <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } onClick={() => this._handleSubmit('generic')}>Send using Email App</Button>
        </div>
        {this._renderFinishButton()}
      </div>
    )
  }
}
