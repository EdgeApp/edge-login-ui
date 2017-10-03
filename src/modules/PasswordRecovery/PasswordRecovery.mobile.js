import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input'
import Dropdown from 'react-toolbox/lib/dropdown'
import _ from 'lodash'
import abcctx from '../../lib/web/abcContext'
import t from '../../lib/web/LocaleStrings'

import * as action from './PasswordRecovery.action.js'
import { setPasswordRecoveryToken } from '../PasswordRecoveryToken/PasswordRecoveryToken.action.js'
import { checkPasswordRecovery } from './PasswordRecovery.middleware.js'

import styles from './PasswordRecovery.mobileStyle.scss'

class PasswordRecovery extends Component {
  _handleSubmit = () => {
    const callback = (error, token) => {
      if (error) {
        switch (error.type) {
          case 'firstQuestion' :
            return this.props.dispatch(action.errorFirstQuestion(error.message))
          case 'secondQuestion' :
            return this.props.dispatch(action.errorSecondQuestion(error.message))
          case 'firstAnswer' :
            return this.props.dispatch(action.errorFirstAnswer(error.message))
          case 'secondAnswer' :
            return this.props.dispatch(action.errorSecondAnswer(error.message))
        }
      }
      if (!error && token) {
        this.props.dispatch(setPasswordRecoveryToken(token))
        this.props.dispatch(action.finishPasswordRecovery())
        return this.props.history.push('/passwordrecoverytoken')
      }
    }
    this.props.dispatch(action.clearPasswordRecovery())
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
        account: this.props.account,
        location: this.props.location.pathname
      },
        callback
      )
    )
  }
  loadQuestions = () => {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      ctx.listRecoveryQuestionChoices((error, results) => {
        if (error) {
          this.props.dispatch(action.errorFirstQuestion(t('string_connection_error_server')))
          return this.props.dispatch(action.errorSecondQuestion(t('string_connection_error_server')))
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
  _handleOnChangeFirstQuestion = (firstQuestion) => {
    this.props.dispatch(action.changeFirstPasswordRecoveryQuestionValue(firstQuestion))
  }
  _handleOnChangeFirstAnswer = (firstAnswer) => {
    this.props.dispatch(action.changeFirstPasswordRecoveryAnswerValue(firstAnswer))
  }
  _handleOnChangeSecondQuestion = (secondQuestion) => {
    this.props.dispatch(action.changeSecondPasswordRecoveryQuestionValue(secondQuestion))
  }
  _handleOnChangeSecondAnswer = (secondAnswer) => {
    this.props.dispatch(action.changeSecondPasswordRecoveryAnswerValue(secondAnswer))
  }
  _renderQuestions1 = () => {
    const filtered = _.filter(this.props.questions, question => this.props.secondQuestion !== question)
    const questions = _.map(filtered, question => ({ value: question, label: question }))
    return [ {value: 'Choose a question', label: 'Choose a question'}, ...questions ]
  }
  _renderQuestions2 = () => {
    const filtered = _.filter(this.props.questions, question => this.props.firstQuestion !== question)
    const questions = _.map(filtered, question => ({ value: question, label: question }))
    return [ {value: 'Choose a question', label: 'Choose a question'}, ...questions ]
  }
  _renderButtonRows = () => {
    if (!this.props.loader.loading) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={this._handleSubmit}>Submit</button>
          <button className={styles.secondaryMobile} onClick={e => this.props.history.push('/account')}>Back</button>
        </div>
      )
    }
    if (this.props.loader.loading) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryLoadMobile}><div className={styles.loader} /></button>
          <button className={styles.secondaryLoadMobile}>Back</button>
        </div>
      )
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <form onSubmit={e => { e.preventDefault(); this._handleSubmit(e) }} className={styles.forms}>
          <Dropdown
            source={this._renderQuestions1()}
            onChange={this._handleOnChangeFirstQuestion}
            value={this.props.firstQuestion}
            allowBlank={false}
            className={styles.formDropdown}
            error={this.props.error.firstQuestion}
            required
          />
          <Input
            type='text'
            name='firstAnswer'
            onChange={this._handleOnChangeFirstAnswer}
            value={this.props.firstAnswer}
            label={t('activity_recovery_first_answer')}
            className={styles.formInput}
            error={this.props.error.firstAnswer}
            required
          />
          <p className={styles.note}>{this.props.error.firstAnswer ? '' : 'Answers are case sensitive' }</p>
          <Dropdown
            source={this._renderQuestions2()}
            onChange={this._handleOnChangeSecondQuestion}
            value={this.props.secondQuestion}
            allowBlank={false}
            className={styles.formDropdown}
            error={this.props.error.secondQuestion}
            required
          />
          <Input
            type='text'
            name='secondAnswer'
            onChange={this._handleOnChangeSecondAnswer}
            value={this.props.secondAnswer}
            label={t('activity_recovery_second_answer')}
            className={styles.formInput}
            error={this.props.error.secondAnswer}
            required
          />
          <p className={styles.note}>{this.props.error.secondAnswer ? '' : 'Answers are case sensitive'}</p>
        </form>
        {this._renderButtonRows()}
      </div>
    )
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
  error: {
    firstQuestion: state.passwordRecovery.error.firstQuestion,
    secondQuestion: state.passwordRecovery.error.secondQuestion,
    firstAnswer: state.passwordRecovery.error.firstAnswer,
    secondAnswer: state.passwordRecovery.error.secondAnswer
  },
  loader: state.loader,
  account: state.user
}))(PasswordRecovery)
