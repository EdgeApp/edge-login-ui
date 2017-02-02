import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import nextButton from 'theme/nextButton.scss'
import backButton from 'theme/backButton.scss'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import { fadeWhiteOverlay } from '../Landing.action'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'

import { checkUsername } from './Username.middleware'
import t from 'lib/web/LocaleStrings'

import { changeUsernameValue } from './Username.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'

class UsernameComponent extends Component {

  _handleSubmit = () => {
    if (this.props.username.length < 3) {
      return this.props.dispatch(
        openErrorModal(t('activity_signup_insufficient_username_message'))
      )
    }

    if (this.props.username.length >= 3) {
      return this.props.dispatch(
        checkUsername(
          this.props.username,
          () => browserHistory.push('/signup/pin')
        )
      )
    }
  }

  _handleBack = () => {
    if (this.props.loader.loading === false) {
      this.props.dispatch(fadeWhiteOverlay())
      browserHistory.goBack()
    }
  }

  _handleOnChangeText = (username) => {
    this.props.dispatch(
      changeUsernameValue(username)
    )
  }

  render () {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button onClick={this._handleBack} theme={backButton} style={{position: 'absolute', left: 0, top: 0}} type='button'>{t('string_capitalize_exit')}</Button>
          <div style={{textAlign: 'center', fontSize: 30, padding: 10}}>{t('fragment_setup_username_label')}</div>
        </div>
        <Card>
          <CardText>
            <Input autoFocus type='text' name='username' onChange={this._handleOnChangeText} value={this.props.username} placeholder={t('fragment_landing_username_hint')} />
            <p style={{whiteSpace: 'pre-line'}}>{t('fragment_setup_username_text')}</p>
          </CardText>

          <CardActions>
            <Button type='button' raised theme={nextButton} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default connect(state => ({

  username: state.username,
  loader: state.loader

}))(UsernameComponent)
