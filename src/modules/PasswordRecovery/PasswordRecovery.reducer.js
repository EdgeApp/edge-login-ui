import * as ACTION from './PasswordRecovery.action'

const defaultQuestion = 'Choose a question'

export const view = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD_RECOVERY_VIEW :
      return true
    case ACTION.HIDE_PASSWORD_RECOVERY_VIEW :
      return false
    case ACTION.PASSWORD_RECOVERY_DONE :
      return false
    default:
      return state
  }
}

export const viewToken = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD_RECOVERY_TOKEN_VIEW :
      return true
    case ACTION.HIDE_PASSWORD_RECOVERY_TOKEN_VIEW :
      return false
    case ACTION.PASSWORD_RECOVERY_DONE :
      return false
    default:
      return state
  }
}

export const viewFinishModal = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD_RECOVERY_FINISH_MODAL :
      return true
    case ACTION.HIDE_PASSWORD_RECOVERY_FINISH_MODAL :
      return false
    default:
      return state
  }
}

export const finishButton = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_PASSWORD_RECOVERY_TOKEN_BUTTON :
      return true
    case ACTION.HIDE_PASSWORD_RECOVERY_TOKEN_BUTTON :
      return false
    case ACTION.PASSWORD_RECOVERY_DONE :
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

export const firstQuestion = (state = defaultQuestion, action) => {
  switch (action.type) {
    case ACTION.CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE :
      return action.data
    case ACTION.PASSWORD_RECOVERY_DONE :
      return defaultQuestion
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

export const secondQuestion = (state = defaultQuestion, action) => {
  switch (action.type) {
    case ACTION.CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE :
      return action.data
    case ACTION.PASSWORD_RECOVERY_DONE :
      return defaultQuestion
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

export const token = (state = '', action) => {
  switch (action.type) {
    case ACTION.PASSWORD_RECOVERY_TOKEN :
      return action.data
    default:
      return state
  }
}

export const email = (state = '', action) => {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_RECOVERY_EMAIL :
      return action.data
    case ACTION.PASSWORD_RECOVERY_DONE :
      return ''
    default:
      return state
  }
}

export const error = (state = '', action) => {
  switch (action.type) {
    case ACTION.ERROR_PASSWORD_RECOVERY :
      return action.data
    case ACTION.CLEAR_PASSWORD_RECOVERY :
      return ''
    default:
      return state
  }
}
