import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import t from '../../lib/web/LocaleStrings'
import nextButton from 'theme/nextButton.scss'
import backButton from 'theme/backButton.scss'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'

import { changeSignupPage } from '../Signup/Signup.action'
import { changePinNumberValue } from './PinNumber.action'
import { checkPIN } from './PinNumber.middleware'

import neutral from 'theme/neutralButtonWithBlueText.scss'
import styles from './PinNumber.webStyle'

class PinComponent extends Component {

  _handleSubmit = (e) => {
    this.props.dispatch(
     checkPIN(
        this.props.pin,
        () => this.props.dispatch(
          changeSignupPage('password')
        )
      )
    )
  }

  _handleBack = () => {
    this.props.dispatch(
      changeSignupPage('username')
    )
  }

  _handleOnChangeText = (pin) => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    if(/^\d+$/.test(pin) || pin.length === 0) {
      this.props.dispatch(
        changePinNumberValue(pin)
      )
    }
    if (pin.length > 3) {
      setTimeout(this._handleSubmit, 200)
    }
  }

  pinStyle = () => {
    if (this.props.pin.length > 0) {
      return {textAlign: 'center', fontSize: '70px', height: '80px'}
    }else{
      return {textAlign: 'center', fontSize: '35px', height: '80px'}
    }
  }

  render () {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <div className={styles.title}>
            <h4>{t('activity_signup_pin_label')}</h4>
          </div>
        </div>
        <form  className={styles.containerBody} onSubmit={e => this._handleSubmit(e)}>
          <div className={styles.inputDiv}>
            <Input
              ref='signupPin'
              type="password"
              name="pin"
              autoFocus
              placeholder={t('activity_signup_pin_hint')}
              style={this.pinStyle()}
              onChange={this._handleOnChangeText}
              value={this.props.pin}
            />
          </div>
          <div className={styles.section}>
            <p className={styles.text}>{t('fragment_setup_pin_text')}</p>
          </div>
          <div className={styles.buttonSection}>
            <Button theme={neutral} raised onClick={this._handleBack}>{t('string_capitalize_back')}</Button>                        
            <Button type="button" raised theme={nextButton} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(state => ({

  pin: state.pin

}))(PinComponent)
