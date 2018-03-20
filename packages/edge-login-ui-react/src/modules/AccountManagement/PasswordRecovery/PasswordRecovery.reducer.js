import * as ACTION from './PasswordRecovery.action'

const defaultQuestion = 'Choose a question'

export const questions = (state = [], action) => {
  switch (action.type) {
    case ACTION.PASSWORD_RECOVERY_QUESTIONS:
      return action.data
    default:
      return state
  }
}

export const firstQuestion = (state = defaultQuestion, action) => {
  switch (action.type) {
    case ACTION.CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return defaultQuestion
    default:
      return state
  }
}

export const firstAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

export const secondQuestion = (state = defaultQuestion, action) => {
  switch (action.type) {
    case ACTION.CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return defaultQuestion
    default:
      return state
  }
}

export const secondAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE:
      return action.data
    case ACTION.FINISH_PASSWORD_RECOVERY:
      return ''
    default:
      return state
  }
}

export const errorFirstQuestion = (state = '', action) => {
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

export const errorSecondQuestion = (state = '', action) => {
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

export const errorFirstAnswer = (state = '', action) => {
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

export const errorSecondAnswer = (state = '', action) => {
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
