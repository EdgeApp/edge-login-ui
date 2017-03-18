import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import abcctx from '../../lib/web/abcContext'
import Input from 'react-toolbox/lib/input'
import Dialog from 'react-toolbox/lib/dialog'
import Dropdown from 'react-toolbox/lib/dropdown'
import _ from 'lodash'

import { browserHistory } from 'react-router'
import * as action from './PasswordRecovery.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { checkPasswordRecovery } from './PasswordRecovery.middleware'

import PasswordRecoveryToken from './PasswordRecoveryToken.web'

import styles from './PasswordRecovery.webStyle'
import neutralButtons from 'theme/neutralButtons.scss'
import primaryButtons from 'theme/primaryButtons.scss'

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

  _handleHideModal = () => {
    this.props.dispatch(action.hidePasswordRecoveryView())
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

  _handleShowPasswordRecovery = (e) => {
    this.props.dispatch(action.showPasswordRecoveryView())
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

  _handleOnChangePassword = (password) => {
    this.props.dispatch(action.changePasswordRecoveryPassword(password))
  }

  _handleOnChangeEmail = (email) => {
    this.props.dispatch(action.changePasswordRecoveryEmail(email))
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

  buttons = [
    { label: "Submit", onClick: this._handleSubmit, theme: primaryButtons, raised: true, primary: true },
    { label: "Close", onClick: this._handleHideModal, theme: neutralButtons }
  ]

  _renderView = () => {

    if (!this.props.viewToken) {
      const renderPasswordInput = () => {
        if(this.props.location.pathname === "/review") {
            return null
        }
        if(this.props.location.pathname !== "/review") {
          return (
            <Input
              type='password'
              name='recoveryPassword'
              onChange={this._handleOnChangePassword}
              value={this.props.password}
              label={t('send_confirmation_enter_send_password')}
              required
            />
          )
        }
      }

      return (
        <form onSubmit={e => { e.preventDefault; this._handleSubmit(e); }}>
          <div className={styles.passwordInputs}>
            <Dropdown
              auto
              source={this._renderQuestions1()}
              onChange={this._handleOnChangeFirstQuestion}
              value={this.props.firstQuestion}
              required
	      		  allowBlank={false}
            />
            <Input
		        	type='text'
		  		    name='firstAnswer'
              onChange={this._handleOnChangeFirstAnswer}
              value={this.props.firstAnswer}
              label={t('activity_recovery_first_answer')}
              required
            />
            <Dropdown
              auto
              source={this._renderQuestions2()}
              onChange={this._handleOnChangeSecondQuestion}
              value={this.props.secondQuestion}
			        allowBlank={false}
              required
            />
            <Input
              type='text'
              name='secondAnswer'
              onChange={this._handleOnChangeSecondAnswer}
              value={this.props.secondAnswer}
              label={t('activity_recovery_second_answer')}
              required
            />
            {renderPasswordInput()}
          </div>
        </form>
      )
    }

    if (this.props.viewToken) {
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

  render () {
    return (
      <Dialog
        actions={this.props.viewToken ? [] : this.buttons}
        active={this.props.view}
        title={t('activity_recovery_setup_title')}
      >
        { this._renderView() }
      </Dialog>
    )

  }
}

export default connect(state => ({

  view          : state.passwordRecovery.view,
  viewToken     : state.passwordRecovery.viewToken,
  finishButton  : state.passwordRecovery.finishButton,
  questions     : state.passwordRecovery.questions,
  firstQuestion : state.passwordRecovery.firstQuestion,
  firstAnswer   : state.passwordRecovery.firstAnswer,
  secondQuestion: state.passwordRecovery.secondQuestion,
  secondAnswer  : state.passwordRecovery.secondAnswer,
  password      : state.passwordRecovery.password,
  token         : state.passwordRecovery.token,
  email         : state.passwordRecovery.email,
  account       : state.user

}))(PasswordRecovery)
