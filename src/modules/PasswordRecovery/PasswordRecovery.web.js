import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import abcctx from '../../lib/web/abcContext'
import Dialog from 'react-toolbox/lib/dialog'

import { browserHistory } from 'react-router'
import * as action from './PasswordRecovery.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { checkPasswordRecovery } from './PasswordRecovery.middleware'
import Dropdown from 'react-toolbox/lib/dropdown'

import PasswordRecoveryToken from './PasswordRecoveryToken.web'

import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import signinButton from 'theme/signinButton.scss'
import skipButton from 'theme/skipButton.scss'
import styles from './PasswordRecovery.webStyle'
import neutralButtonWithBlueTextTheme from 'theme/neutralButtonWithBlueText.scss'

class PasswordRecovery extends Component {

  loadQuestions = () => {
    const dispatch = this.props.dispatch
    abcctx(ctx => {
		// ctx.listRecoveryQuestionChoices()
        // if (error) {
        //   dispatch(openErrorModal(t('string_connection_error_server')))
        //   dispatch(action.hidePasswordRecoveryView())
        // }
        // if (!error) {
        //   const questions = results.filter(result => result.category === 'recovery2').map(result => result.question)
        //   dispatch(action.setPasswordRecoveryQuestions(questions))
        // }
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
        account: this.props.account
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

  _renderQuestions = () => {
    // const questions = this.props.questions.map((question, index) => {
    //   return { value: question, label: question }
    // })
	// return [ ...questions , {value: 'Choose a question', label: 'Choose a question'} ]
	return [ {value: t('activity_recovery_default_choice'), label: t('activity_recovery_default_choice')} ]
  }

  _renderView = () => {

    if (!this.props.viewToken) {
      return (
        <form onSubmit={e => { e.preventDefault; this._handleSubmit(e); }}>
          <div>
            <Dropdown
              auto
              onChange={this._handleOnChangeFirstQuestion}
              value={this.props.firstQuestion}
              source={this._renderQuestions()}
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
              source={this._renderQuestions()}
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
            <Input
              type='password'
              name='recoveryPassword'
              onChange={this._handleOnChangePassword}
              value={this.props.password}
              label={t('send_confirmation_enter_send_password')}
              required
            />
          </div>
          <div>
            <Button type='button' theme={skipButton} raised onClick={this._handleHideModal}>Close</Button>
            <Button type='submit' primary style={{width: '50%'}} raised onClick={this._handleSubmit}>Submit</Button>
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
        actions={this.buttons}
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
