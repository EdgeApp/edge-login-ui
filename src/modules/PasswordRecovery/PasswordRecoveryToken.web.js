import React, { Component } from 'react'
import t from '../../lib/web/LocaleStrings'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import { showPasswordRecoveryFinishModal, passwordRecoveryDone } from './PasswordRecovery.action'
import { checkEmail } from './PasswordRecovery.middleware'
import passwordRecoveryStyles from './PasswordRecovery.webStyle.scss'

import emailIcon from '../../img/email-icon-black.svg'
import gmailIcon from '../../img/gmail-white.svg'
import microsoftIcon from '../../img/microsoft-white.svg'
import yahooIcon from '../../img/yahoo-white.svg'

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
          <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } style={{textAlign: 'center', marginTop: '30px'}} onClick={this._handleClose}>{t('string_done')}</Button>
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
        <div className={passwordRecoveryStyles.recoveryButtons}>
          <div>
            <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } style={{backgroundColor: '#dd4b39'}} onClick={() => this._handleSubmit('google')}>
              <img src={gmailIcon} /> {t('password_recovery_gmail')}
            </Button>
          </div>
          <div>
            <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } style={{backgroundColor: '#720e9e'}} onClick={() => this._handleSubmit('yahoo')}>
              <img src={yahooIcon} /> {t('password_recovery_yahoo')}
            </Button>
          </div>
          <div>
            <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } style={{backgroundColor: '#2672ec'}} onClick={() => this._handleSubmit('microsoft')}>
              <img src={microsoftIcon} /> {t('password_recovery_microsoft')}
            </Button>
          </div>
          <div>
            <Button type='button' raised primary className={ passwordRecoveryStyles.emailButton } style={{backgroundColor: '#bcddff', color: 'black'}} onClick={() => this._handleSubmit('generic')}>
              <img src={emailIcon} /> {t('password_recovery_app')}
            </Button>
          </div>
        {this._renderFinishButton()}
        </div>
      </div>
    )
  }
}
