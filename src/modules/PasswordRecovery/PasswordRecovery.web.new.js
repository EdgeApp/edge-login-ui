import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Input from 'react-toolbox/lib/input'
import Dropdown from 'react-toolbox/lib/dropdown'
import _ from 'lodash'
import abcctx from '../../lib/web/abcContext'
import t from '../../lib/web/LocaleStrings'

import * as action from './PasswordRecovery.action'
import { checkPasswordRecovery } from './PasswordRecovery.middleware'

import styles from './PasswordRecovery.webStyle.scss'

class PasswordRecovery extends Component {

  loadQuestions = () => {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      ctx.listRecoveryQuestionChoices((error, results) => {
        if (error) {
          // dispatch(openErrorModal(t('string_connection_error_server')))
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
        account: this.props.account,
        location: this.props.location.pathname
      },
        callback
      )
    )
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
    console.log(this.props.questions)
    const filtered = _.filter(this.props.questions, question => this.props.secondQuestion !== question)
    const questions = _.map(filtered, question => ({ value: question, label: question }))
    return [ {value: 'Choose a question', label: 'Choose a question'}, ...questions ]
  }

  _renderQuestions2 = () => {
    const filtered = _.filter(this.props.questions, question => this.props.firstQuestion !== question)
    const questions = _.map(filtered, question => ({ value: question, label: question }))
    return [ {value: 'Choose a question', label: 'Choose a question'}, ...questions ]
  }

  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Password Recovery Setup</p>
        <form onSubmit={e => { e.preventDefault(); this._handleSubmit(e) }}>
          <div className={styles.passwordInputs}>
            <Dropdown
              auto
              source={this._renderQuestions1()}
              onChange={this._handleOnChangeFirstQuestion}
              value={this.props.firstQuestion}
              required
              allowBlank={false}
              className={styles.formDropdown}
            />
            <Input
              type='text'
              name='firstAnswer'
              onChange={this._handleOnChangeFirstAnswer}
              value={this.props.firstAnswer}
              label={t('activity_recovery_first_answer')}
              className={styles.formInput}
              required
            />
            <p className={styles.note}>Answers are case sensitive</p>
            <Dropdown
              auto
              source={this._renderQuestions2()}
              onChange={this._handleOnChangeSecondQuestion}
              value={this.props.secondQuestion}
              allowBlank={false}
              className={styles.formDropdown}
              required
            />
            <Input
              type='text'
              name='secondAnswer'
              onChange={this._handleOnChangeSecondAnswer}
              value={this.props.secondAnswer}
              label={t('activity_recovery_second_answer')}
              className={styles.formInput}
              required
            />
            <p className={styles.note}>Answers are case sensitive</p>
          </div>
        </form>
        <div className={styles.rowButtonsCustom}>
          <Link to='/account'>
            <button className={styles.secondary}>Close</button>
          </Link>
          <button className={styles.primary}>Submit</button>
        </div>
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
  account: state.user

}))(PasswordRecovery)
