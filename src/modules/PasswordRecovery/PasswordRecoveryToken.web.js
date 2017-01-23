import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'
import abcctx from '../../lib/web/abcContext'

import * as action from './PasswordRecovery.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { processEmail } from './PasswordRecovery.middleware'

export default class PasswordRecovery extends Component {

  _handleSubmit = (url) => {
    this.props.dispatch(
      processEmail(
      
      )
    )  
  }

  _handleEmailGoogle = () => {
    this._handleSubmit(
      'https://mail.google.com/mail/?view=cm&fs=1&to={0}&su={1}&body={2}'
    )
  }

  _handleEmailYahoo = () => {
    this._handleSubmit(
      'http://compose.mail.yahoo.com/?to={0}&subj={1}&body={2}'
    )
  }

  _handleEmailMicrosoft = () => {
    this._handleSubmit(
      'https://mail.live.com/default.aspx?rru=compose&to={0}&subject={1}&body={2}'
    )
  }

  _handleEmailDefault = () => {
    this._handleSubmit(
      'mailto:{0}?subject={1}&body={2}'
    )
  }
    callBackEmail (vendorEmailUrl) {
      if (tools.validateEmail(this.refs.email.value)) {
        console.log('good email')

        var username = 'NoName'

        if (this.account) {
          username = tools.obfuscateUsername(this.account.username)
        }

        var mobileLinks = String.format('iOS\n{0}://recovery?token={1}\n\n' +
          'Android\nhttps://recovery.airbitz.co/recovery?token={1}', 'airbitz', this.state.recoveryToken)

        var emailTo = this.refs.email.value
        var emailSubject = String.format(strings.recovery_email_subject, this.vendorName)
        emailSubject = encodeURI(emailSubject)
        var emailBody = String.format(strings.recovery_token_email_body, 'Airbitz', username, mobileLinks)
        emailBody = encodeURI(emailBody)

        // Swap out the '#' for '%23' as encodeURI doesn't seem to do it and it breaks Gmail
        emailBody = emailBody.replace('index.html#', 'index.html%23')

        var urlFinal = String.format(vendorEmailUrl, emailTo, emailSubject, emailBody)
        this.setState({'showDone': true})
        window.open(urlFinal, '_blank')
      } else {
        this.refs.emailform.setState({'error': ABCError(1, strings.invalid_email_address).message})
      }
    },
       
  render () {
    return (
      <div>First Question AnswerFirst Question Answer
        <div>
          <input type="email" name="" onChange={this.props.handleOnChangeEmail} value={this.props.email} placeholder="Email Address"/>	
        </div>
        <div>
          <button type="button" onClick={this._handleEmailGoogle}>Send using Gmail</button>
        </div>
        <div>
          <button type="button" onClick={this._handleEmailYahoo}>Send using Yahoo</button>
        </div>
        <div>
          <button type="button" onClick={this._handleEmailMicrosoft}>Send using Hotmail, Outlook, Live Mail</button>
        </div>
        <div>
          <button type="button" onClick={this._handleEmailDefault}>Send using Email App</button>
        </div>
      </div>
    )
  }
}
