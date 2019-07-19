import { combineReducers } from 'redux'

import * as ACTION from '../actions/AccountPasswordRecovery.action'
import t from '../lib/LocaleStrings'

const questions = (state = [], action) => {
  switch (action.type) {
    case ACTION.PASSWORD_RECOVERY_QUESTIONS:
      return action.data
    default:
      return state
  }
}

const firstQuestion = (
  state = t('account_password_recovery_default_question'),
  action
) => {
  switch (action.type) {
    case ACTION.CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return t('account_password_recovery_default_question')
    default:
      return state
  }
}

const firstAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

const secondQuestion = (
  state = t('account_password_recovery_default_question'),
  action
) => {
  switch (action.type) {
    case ACTION.CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return t('account_password_recovery_default_question')
    default:
      return state
  }
}

const secondAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

const errorFirstQuestion = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_FIRST_QUESTION_PASSWORD_RECOVERY:
      return action.data
    case ACTION.CLEAR_PASSWORD_RECOVERY:
      return ''
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

const errorSecondQuestion = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_SECOND_QUESTION_PASSWORD_RECOVERY:
      return action.data
    case ACTION.CLEAR_PASSWORD_RECOVERY:
      return ''
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

const errorFirstAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_FIRST_ANSWER_PASSWORD_RECOVERY:
      return action.data
    case ACTION.CLEAR_PASSWORD_RECOVERY:
      return ''
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

const errorSecondAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_SECOND_ANSWER_PASSWORD_RECOVERY:
      return action.data
    case ACTION.CLEAR_PASSWORD_RECOVERY:
      return ''
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

const loadingQuestions = (state = false, action) => {
  switch (action.type) {
    case ACTION.OPEN_LOADING_QUESTIONS:
      return true
    case ACTION.CLOSE_LOADING_QUESTIONS:
      return false
    default:
      return state
  }
}

export default combineReducers({
  questions,
  firstQuestion,
  firstAnswer,
  secondQuestion,
  secondAnswer,
  error: combineReducers({
    firstQuestion: errorFirstQuestion,
    secondQuestion: errorSecondQuestion,
    firstAnswer: errorFirstAnswer,
    secondAnswer: errorSecondAnswer
  }),
  loadingQuestions
})
