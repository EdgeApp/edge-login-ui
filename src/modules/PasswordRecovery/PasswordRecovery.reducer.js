import * as ACTION from './PasswordRecovery.action'

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD_RECOVERY_VIEW :
      return true
    case ACTION.HIDE_PASSWORD_RECOVERY_VIEW :
      return false
    default:
      return state
  }
}

export const questions = (state = [], action) => {
  switch (action.type) {
    case ACTION.PASSWORD_RECOVERY_QUESTIONS :
      return action.data
    default:
      return state
  }
}

export const firstQuestion = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE :
      return action.data
    case ACTION.PASSWORD_RECOVERY_QUESTIONS :
      return action.data[0]
    case ACTION.PASSWORD_RECOVERY_DONE :
      return ''
    default:
      return state
  }
}

export const firstAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE :
      return action.data
    case ACTION.PASSWORD_RECOVERY_DONE :
      return ''
    default:
      return state
  }
}

export const secondQuestion = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE :
      return action.data
    case ACTION.PASSWORD_RECOVERY_QUESTIONS :
      return action.data[0]
    case ACTION.PASSWORD_RECOVERY_DONE :
      return ''
    default:
      return state
  }
}

export const secondAnswer = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE :
      return action.data
    case ACTION.PASSWORD_RECOVERY_DONE :
      return ''
    default:
      return state
  }
}

export const password = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_RECOVERY_PASSWORD :
      return action.data
    case ACTION.PASSWORD_RECOVERY_DONE :
      return ''
    default:
      return state
  }
}
