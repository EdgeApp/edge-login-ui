import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import abcctx from '../../lib/web/abcContext'

import { browserHistory } from 'react-router'
import * as action from './PasswordRecovery.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { checkPasswordRecovery } from './PasswordRecovery.middleware'
import Dropdown from 'react-toolbox/lib/dropdown'

import PasswordRecoveryToken from './PasswordRecoveryToken.web'

import Button from 'react-toolbox/lib/button'

import Input from 'react-toolbox/lib/input'
import signinButton from 'theme/signinButton.scss';
import skipButton from 'theme/skipButton.scss';

import { Card, CardText, CardTitle, CardActions } from 'react-toolbox/lib/card'
class PasswordRecovery extends Component {



  loadQuestions = () => {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      ctx.listRecoveryQuestionChoices((error, results) => {
        if (error) {
          dispatch(openErrorModal(t('string_connection_error_server')))
          dispatch(action.hidePasswordRecoveryView())
        }
        if (!error) {
          const questions = results.filter(result => result.category === 'recovery2').map(result => result.question)
          dispatch(action.setPasswordRecoveryQuestions(questions))
        }
      })
    })
  }
  componentWillMount = () => {
    this.loadQuestions()
  }
  _handleSubmit = () => {
    const callback = (error) => console.log(error)
    this.props.dispatch(
      checkPasswordRecovery({
        questions: [
          this.props.firstQuestion,
          this.props.secondQuestion
        ],
        answers: [
          this.props.firstAnswer,
          this.props.secondAnswer
        ],
        password: this.props.password,
        account: this.props.account
      },
        callback
      )
    )
  }

  skipPasswordRecoverySetup = () => {
    browserHistory.push('/home')
  }

  _handleShowPasswordRecovery = (e) => {
    this.props.dispatch(action.showPasswordRecoveryView())
  }

  _handleOnChangeFirstQuestion = (e) => {
    const firstQuestion = e
    this.props.dispatch(action.changeFirstPasswordRecoveryQuestionValue(firstQuestion))
  }

  _handleOnChangeFirstAnswer = (e) => {
    const firstAnswer = e
    this.props.dispatch(action.changeFirstPasswordRecoveryAnswerValue(firstAnswer))
  }

  _handleOnChangeSecondQuestion = (e) => {
    const secondQuestion = e
    this.props.dispatch(action.changeSecondPasswordRecoveryQuestionValue(secondQuestion))
  }

  _handleOnChangeSecondAnswer = (e) => {
    const secondAnswer = e
    this.props.dispatch(action.changeSecondPasswordRecoveryAnswerValue(secondAnswer))
  }

  _handleOnChangePassword = (e) => {
    const password = e
    this.props.dispatch(action.changePasswordRecoveryPassword(password))
  }

  _handleOnChangeEmail = (e) => {
    const email = e
    this.props.dispatch(action.changePasswordRecoveryEmail(email))
  }

  _renderQuestions = () => {
    return this.props.questions.map((question, index) => {
      return { value: question, label: question }
    })
  }

  render () {
    if (this.props.view && !this.props.viewToken) {
      return (
        <div style={{padding: '0 0.4em'}}>
          <h2>{t('activity_recovery_setup_title')}</h2>

          <div style={{padding: '0 0.8em'}}>
            <Dropdown
              auto
              onChange={this._handleOnChangeFirstQuestion}
              value={this.props.firstQuestion}
              source={this._renderQuestions()}
              required/>
            <Input type='text' name='firstAnswer' onChange={this._handleOnChangeFirstAnswer} value={this.props.firstAnswer} placeholder='First Question Answer' required />

            <Dropdown
              auto
              source={this._renderQuestions()}
              onChange={this._handleOnChangeSecondQuestion}
              value={this.props.secondQuestion}
              required/>
            <Input type='text' name='secondAnswer' onChange={this._handleOnChangeSecondAnswer} value={this.props.secondAnswer} placeholder='Second Question Answer' required />

            <Input type='password' name='recoveryPassword' onChange={this._handleOnChangePassword} value={this.props.password} placeholder='Password' required />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
            <Button type='button' theme={signinButton} raised primary style={{margin: '10px 0px 10px 0px'}} onClick={this._handleSubmit}>Submit</Button>
            <Button theme={skipButton} raised neutral style={{margin: '10px 0px'}} onClick={this.skipPasswordRecoverySetup}>{t('activity_recovery_skip_button_text')}</Button>
          </div>
        </div>
      )
    }
    if (!this.props.view && !this.props.viewToken) {
      return (
        <div>
          <button type='button' onClick={this._handleShowPasswordRecovery}>Show</button>
        </div>
      )
    }
    if (!this.props.view && this.props.viewToken) {
      return (
        <PasswordRecoveryToken
          handleOnChangeEmail={this._handleOnChangeEmail}
          email={this.props.email}
          token={this.props.token}
          username={this.props.account.username}
          dispatch={this.props.dispatch}
          finishButton={this.props.finishButton}
        />
      )
    }
  }
}

export default connect(state => ({

  view: state.passwordRecovery.view,
  viewToken: state.passwordRecovery.viewToken,
  finishButton: state.passwordRecovery.finishButton,
  questions: state.passwordRecovery.questions,
  firstQuestion: state.passwordRecovery.firstQuestion,
  firstAnswer: state.passwordRecovery.firstAnswer,
  secondQuestion: state.passwordRecovery.secondQuestion,
  secondAnswer: state.passwordRecovery.secondAnswer,
  password: state.passwordRecovery.password,
  token: state.passwordRecovery.token,
  email: state.passwordRecovery.email,
  account: state.user

}))(PasswordRecovery)
