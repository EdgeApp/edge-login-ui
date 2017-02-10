import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import abcctx from '../../lib/web/abcContext'

import * as action from './PasswordRecovery.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { checkPasswordRecovery } from './PasswordRecovery.middleware'

import PasswordRecoveryToken from './PasswordRecoveryToken.web'

class PasswordRecovery extends Component {

  componentWillMount () {
    this._loadQuestions()
  }

  _loadQuestions = () => {
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

  _handleShowPasswordRecovery = (e) => {
    this.props.dispatch(action.showPasswordRecoveryView())
  }

  _handleOnChangeFirstQuestion = (e) => {
    const firstQuestion = e.target.value
    this.props.dispatch(action.changeFirstPasswordRecoveryQuestionValue(firstQuestion))
  }

  _handleOnChangeFirstAnswer = (e) => {
    const firstAnswer = e.target.value
    this.props.dispatch(action.changeFirstPasswordRecoveryAnswerValue(firstAnswer))
  }

  _handleOnChangeSecondQuestion = (e) => {
    const secondQuestion = e.target.value
    this.props.dispatch(action.changeSecondPasswordRecoveryQuestionValue(secondQuestion))
  }

  _handleOnChangeSecondAnswer = (e) => {
    const secondAnswer = e.target.value
    this.props.dispatch(action.changeSecondPasswordRecoveryAnswerValue(secondAnswer))
  }

  _handleOnChangePassword = (e) => {
    const password = e.target.value
    this.props.dispatch(action.changePasswordRecoveryPassword(password))
  }

  _handleOnChangeEmail = (e) => {
    const email = e.target.value
    this.props.dispatch(action.changePasswordRecoveryEmail(email))
  }

  _renderQuestions = () => {
    return this.props.questions.map((question, index) => {
      return <option key={index} value={question}>{question}</option>
    })
  }

  render () {
    if (this.props.view && !this.props.viewToken) {
      return (
        <div>
          <div>
            <select onChange={this._handleOnChangeFirstQuestion} value={this.props.firstQuestion} required>
              {this._renderQuestions()}
            </select>
          </div>
          <div>
            <input type='text' name='firstAnswer' onChange={this._handleOnChangeFirstAnswer} value={this.props.firstAnswer} placeholder='First Question Answer' required />
          </div>
          <select onChange={this._handleOnChangeSecondQuestion} value={this.props.secondQuestion} required>
            {this._renderQuestions()}
          </select>
          <div>
            <input type='text' name='secondAnswer' onChange={this._handleOnChangeSecondAnswer} value={this.props.secondAnswer} placeholder='Second Question Answer' required />
          </div>
          <div>
            <input type='password' name='recoveryPassword' onChange={this._handleOnChangePassword} value={this.props.password} placeholder='Password' required />
          </div>
          <div>
            <button type='button' onClick={this._handleSubmit}>Submit</button>
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
