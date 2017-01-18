import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { validate } from './PasswordValidation/PasswordValidation.middleware'
import { checkPassword, skipPassword } from './Password.middleware'

import SkipPassword from './Notification.web'

import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import t from '../../lib/web/LocaleStrings'
import nextButton from 'theme/nextButton.scss';
import backButton from 'theme/backButton.scss';
import skipButton from 'theme/skipButton.scss';

import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


import {
  passwordNotificationShow,
  showPassword,
  hidePassword,
  changePasswordValue,
  changePasswordRepeatValue
} from './Password.action'

const unselected = require('../../img/btn_unselected.png')
const selected = require('../../img/Green-check.png')

class Password extends Component {

  _handleSubmit = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      checkPassword(
        this.props.password,
        this.props.passwordRepeat,
        this.props.validation,
        this.props.username,
        this.props.pin,
        callback
      )
    )
  }

  _handleBack = () => {
    browserHistory.goBack()
  }

  _handlePasswordNotification = () => {
    this.props.dispatch(passwordNotificationShow())
  }
  checkOneNumber = () => this.props.validation.number ? selected : unselected
  checkCharacterLength = () => this.props.validation.characterLength ? selected : unselected
  checkOneUpper = () => this.props.validation.upperCaseChar ? selected : unselected
  checkOneLower = () => this.props.validation.lowerCaseChar ? selected : unselected

  handleSubmitSkipPassword = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      skipPassword(
        this.props.username, 
        this.props.pin,
        callback
      )
    )
  }
  _handleOnChangePassword = (password) => {
    this.props.dispatch(changePasswordValue(password))
    this.props.dispatch(validate(password))
  }

  _handleOnChangePasswordRepeat = (passwordRepeat) => {
    this.props.dispatch(changePasswordRepeatValue(passwordRepeat))
  }

  render () {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button onClick={this._handleBack} theme={backButton} style={{position: 'absolute', left: 0, top: 0}} type="button">{t('string_capitalize_back')}</Button>
          <div style={{textAlign: 'center', fontSize: 30, padding: 10}}>{t('activity_signup_password_label')}</div>
        </div>
        <Card>
          <CardText> 
            <div style={{position: 'relative'}}>
              <div>
                <div style={{fontWeight:'bold',fontSize:'16px'}}>{t('activity_signup_password_requirements')}</div>
                <p style={{display: 'flex', flexDirection:'row', alignItems:'center',fontSize:'14px',margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkOneUpper()}/>{ t('password_rule_no_uppercase') }</p>
                <p style={{display: 'flex', flexDirection:'row',alignItems:'center',fontSize:'14px',margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkOneLower()}/>{ t('password_rule_no_lowercase') }</p>
                <p style={{display: 'flex', flexDirection:'row',alignItems:'center',fontSize:'14px',margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkOneNumber()}/>{ t('password_rule_no_number') }</p>
                <p style={{display: 'flex', flexDirection:'row',alignItems:'center',fontSize:'14px',margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkCharacterLength()}/>{ t('password_rule_too_short') }</p>
              </div>
              <p>{t('fragment_setup_password_text')}</p>
            </div>
            <Input autoFocus type="password" name="password" onChange={this._handleOnChangePassword} value={this.props.password} placeholder="Password" />
            <Input type="password" name="passwordRepeat" onChange={this._handleOnChangePasswordRepeat} value={this.props.passwordRepeat} placeholder="Re-enter Password" />
          </CardText>
          <CardActions>
            <Button type="button" theme={skipButton} onClick={this._handlePasswordNotification}>{t('string_skip')}</Button>
            <Button type="button" raised theme={nextButton} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </CardActions>
        </Card>
        <SkipPassword handleSubmit={this.handleSubmitSkipPassword}/>
    </div>


    )
  }
}

export default connect(state => ({

  inputState: state.password.inputState, //not used
  password: state.password.password,
  passwordRepeat: state.password.passwordRepeat,
  validation: state.password.validation,
  username: state.username,
  pin: state.pin,
  loader: state.loader

}))(Password)
