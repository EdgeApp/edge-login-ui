import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input'
import PasswordRecoveryTokenSuccess from '../Modals/PasswordRecoverySucess/PasswordRecoverySuccess.web.js'

import styles from './PasswordRecoveryToken.webStyle.scss'
import { checkEmail } from './PasswordRecoveryToken.middleware.js'
import {
  changePasswordRecoveryEmail,
  errorPasswordRecoveryEmail,
  finishPasswordRecoveryToken
} from './PasswordRecoveryToken.action.js'
import { openPasswordRecoverySuccessModal, closePasswordRecoverySuccessModal } from '../Modals/PasswordRecoverySucess/PasswordRecoverySuccess.action.js'

import yahoo from '../../img/password-recovery/yahoo.png'
import gmail from '../../img/password-recovery/gmail.png'
import windows from '../../img/password-recovery/windows.png'
import mail from '../../img/password-recovery/mail.png'

class PasswordRecoveryToken extends Component {
  _handleSubmit = (address) => {
    const callback = (error, url) => {
      if (error) {
        return this.props.dispatch(errorPasswordRecoveryEmail(error))
      }
      if (!error && url) {
        window.open(url, '_blank')
        return this.props.dispatch(openPasswordRecoverySuccessModal())
        // return this.props.dispatch(finishPasswordRecoveryToken())
      }
    }
    this.props.dispatch(
      checkEmail(
        address,
        this.props.email,
        this.props.token,
        this.props.account.username,
        callback
      )
    )
  }
  _handleFinish = () => {
    this.props.dispatch(finishPasswordRecoveryToken())
    this.props.dispatch(closePasswordRecoverySuccessModal())
    return this.props.history.push('/account')
  }
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <p className={styles.header}>Save Recovery Token</p>
          <p className={styles.text}>To complete account recovery setup you MUST save an account recovery token. This will be required to rercover your account in addition to your username and recovery answers. Please enter your email below to send youreslf the recovery token.</p>
          <Input
            type='text'
            name='firstAnswer'
            label='Email Address'
            onChange={value => this.props.dispatch(changePasswordRecoveryEmail(value))}
            value={this.props.email}
            className={styles.input}
            error={this.props.error}
            required
          />
        </div>
        <div className={styles.linkRows}>
          <button className={styles.gmail} onClick={() => this._handleSubmit('google')}>
            <span className={styles.logo} ><img src={gmail} /></span>
            <span className={styles.title}>Send with Gmail</span>
            <span className={styles.logo} />
          </button>
          <button className={styles.hotmail} onClick={() => this._handleSubmit('microsoft')}>
            <span className={styles.logoHotmail} ><img src={windows} /></span>
            <span className={styles.titleHotmail}>Send with Hotmail or Live Mail</span>
            <span className={styles.spacerHotmail} />
          </button>
        </div>
        <div className={styles.linkRows}>
          <button className={styles.yahoo} onClick={() => this._handleSubmit('yahoo')}>
            <span className={styles.logo} ><img src={yahoo} /></span>
            <span className={styles.title}>Send with Yahoo</span>
            <span className={styles.logo} />
          </button>
          <button className={styles.default} onClick={() => this._handleSubmit('generic')}>
            <span className={styles.logo} ><img src={mail} /></span>
            <span className={styles.title}>Send with Email App</span>
            <span className={styles.logo} />
          </button>
        </div>
        <PasswordRecoveryTokenSuccess finish={this._handleFinish} />
      </div>
    )
  }
}

export default connect(state => ({
  account: state.user,
  token: state.passwordRecoveryToken.token,
  email: state.passwordRecoveryToken.email,
  error: state.passwordRecoveryToken.error
}))(PasswordRecoveryToken)
