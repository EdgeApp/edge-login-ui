import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import abcctx from '../../../lib/web/abcContext'
import t from '../../../lib/web/LocaleStrings'
import { setPasswordRecoveryToken } from '../PasswordRecoveryToken/PasswordRecoveryToken.action.js'
import * as action from './PasswordRecovery.action.js'
import { checkPasswordRecovery } from './PasswordRecovery.middleware.js'
import Mobile from './PasswordRecovery.mobile.js'
import Desktop from './PasswordRecovery.web.js'

class PasswordRecovery extends Component {
  handleSubmit = () => {
    const callback = (error, token) => {
      if (error) {
        switch (error.type) {
          case 'firstQuestion':
            return this.props.dispatch(action.errorFirstQuestion(error.message))
          case 'secondQuestion':
            return this.props.dispatch(
              action.errorSecondQuestion(error.message)
            )
          case 'firstAnswer':
            return this.props.dispatch(action.errorFirstAnswer(error.message))
          case 'secondAnswer':
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
    return this.props.dispatch(
      checkPasswordRecovery(
        {
          questions: [this.props.firstQuestion, this.props.secondQuestion],
          answers: [this.props.firstAnswer, this.props.secondAnswer],
          account: this.props.account
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
          this.props.dispatch(
            action.errorFirstQuestion(t('string_connection_error_server'))
          )
          return this.props.dispatch(
            action.errorSecondQuestion(t('string_connection_error_server'))
          )
        }
        if (!error) {
          const questions = results
            .filter(result => result.category === 'recovery2')
            .map(result => result.question)
          dispatch(action.setPasswordRecoveryQuestions(questions))
        }
      })
    })
  }
  componentWillMount = () => {
    this.loadQuestions()
  }
  handleOnChangeFirstQuestion = firstQuestion => {
    this.props.dispatch(
      action.changeFirstPasswordRecoveryQuestionValue(firstQuestion)
    )
  }
  handleOnChangeFirstAnswer = firstAnswer => {
    this.props.dispatch(
      action.changeFirstPasswordRecoveryAnswerValue(firstAnswer)
    )
  }
  handleOnChangeSecondQuestion = secondQuestion => {
    this.props.dispatch(
      action.changeSecondPasswordRecoveryQuestionValue(secondQuestion)
    )
  }
  handleOnChangeSecondAnswer = secondAnswer => {
    this.props.dispatch(
      action.changeSecondPasswordRecoveryAnswerValue(secondAnswer)
    )
  }
  renderQuestions1 = () => {
    const filtered = _.filter(
      this.props.questions,
      question => this.props.secondQuestion !== question
    )
    const questions = _.map(filtered, question => ({
      value: question,
      label: question
    }))
    return [
      { value: 'Choose a question', label: 'Choose a question' },
      ...questions
    ]
  }
  renderQuestions2 = () => {
    const filtered = _.filter(
      this.props.questions,
      question => this.props.firstQuestion !== question
    )
    const questions = _.map(filtered, question => ({
      value: question,
      label: question
    }))
    return [
      { value: 'Choose a question', label: 'Choose a question' },
      ...questions
    ]
  }
  gotoAccount = () => {
    return this.props.history.push('/account')
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            firstQuestion={this.props.firstQuestion}
            firstAnswer={this.props.firstAnswer}
            secondQuestion={this.props.secondQuestion}
            secondAnswer={this.props.secondAnswer}
            error={this.props.error}
            loader={this.props.loader.loading}
            renderQuestions1={this.renderQuestions1}
            renderQuestions2={this.renderQuestions2}
            handleOnChangeFirstQuestion={this.handleOnChangeFirstQuestion}
            handleOnChangeFirstAnswer={this.handleOnChangeFirstAnswer}
            handleOnChangeSecondQuestion={this.handleOnChangeSecondQuestion}
            handleOnChangeSecondAnswer={this.handleOnChangeSecondAnswer}
            handleSubmit={this.handleSubmit}
            gotoAccount={this.gotoAccount}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            firstQuestion={this.props.firstQuestion}
            firstAnswer={this.props.firstAnswer}
            secondQuestion={this.props.secondQuestion}
            secondAnswer={this.props.secondAnswer}
            error={this.props.error}
            loader={this.props.loader.loading}
            renderQuestions1={this.renderQuestions1}
            renderQuestions2={this.renderQuestions2}
            handleOnChangeFirstQuestion={this.handleOnChangeFirstQuestion}
            handleOnChangeFirstAnswer={this.handleOnChangeFirstAnswer}
            handleOnChangeSecondQuestion={this.handleOnChangeSecondQuestion}
            handleOnChangeSecondAnswer={this.handleOnChangeSecondAnswer}
            handleSubmit={this.handleSubmit}
            gotoAccount={this.gotoAccount}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  questions: state.passwordRecovery.questions,
  firstQuestion: state.passwordRecovery.firstQuestion,
  firstAnswer: state.passwordRecovery.firstAnswer,
  secondQuestion: state.passwordRecovery.secondQuestion,
  secondAnswer: state.passwordRecovery.secondAnswer,
  error: {
    firstQuestion: state.passwordRecovery.error.firstQuestion,
    secondQuestion: state.passwordRecovery.error.secondQuestion,
    firstAnswer: state.passwordRecovery.error.firstAnswer,
    secondAnswer: state.passwordRecovery.error.secondAnswer
  },
  loader: state.loader,
  account: state.user
}))(PasswordRecovery)
