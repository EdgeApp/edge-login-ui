export const SHOW_PASSWORD_RECOVERY_VIEW = 'SHOW_PASSWORD_RECOVERY_VIEW'
export const HIDE_PASSWORD_RECOVERY_VIEW = 'HIDE_PASSWORD_RECOVERY_VIEW'

export const PASSWORD_RECOVERY_QUESTIONS = 'PASSWORD_RECOVERY_QUESTIONS'

export const CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE    = 'CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE'
export const CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE      = 'CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE'
export const CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE   = 'CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE'
export const CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE     = 'CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE'
export const CHANGE_PASSWORD_RECOVERY_PASSWORD                = 'CHANGE_PASSWORD_RECOVERY_PASSWORD'

export const PASSWORD_RECOVERY_DONE = 'PASSWORD_RECOVERY_DONE'

export function showPasswordRecoveryView () {
  return {
    type: SHOW_PASSWORD_RECOVERY_VIEW
  }
}

export function hidePasswordRecoveryView () {
  return {
    type: HIDE_PASSWORD_RECOVERY_VIEW
  }
}

export function setPasswordRecoveryQuestions (data) {
  return {
    type: PASSWORD_RECOVERY_QUESTIONS,
    data
  }
}

export function changeFirstPasswordRecoveryQuestionValue (data) {
  return {
    type: CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE,
    data
  }
}

export function changeFirstPasswordRecoveryAnswerValue (data) {
  return {
    type: CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE,
    data
  }
}

export function changeSecondPasswordRecoveryQuestionValue (data) {
  return {
    type: CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE,
    data
  }
}

export function changeSecondPasswordRecoveryAnswerValue (data) {
  return {
    type: CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE,
    data
  }
}

export function changePasswordRecoveryPassword (data) {
  return {
    type: CHANGE_PASSWORD_RECOVERY_PASSWORD,
    data
  }
}

export function passwordRecoveryDone () {
  return {
    type: PASSWORD_RECOVERY_DONE 
  }
}
