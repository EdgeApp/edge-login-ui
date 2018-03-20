export const PASSWORD_RECOVERY_QUESTIONS = 'PASSWORD_RECOVERY_QUESTIONS'
export const CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE =
  'CHANGE_FIRST_PASSWORD_RECOVERY_QUESTION_VALUE'
export const CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE =
  'CHANGE_FIRST_PASSWORD_RECOVERY_ANSWER_VALUE'
export const CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE =
  'CHANGE_SECOND_PASSWORD_RECOVERY_QUESTION_VALUE'
export const CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE =
  'CHANGE_SECOND_PASSWORD_RECOVERY_ANSWER_VALUE'
export const PASSWORD_RECOVERY_TOKEN = 'PASSWORD_RECOVERY_TOKEN'
export const ERROR_FIRST_QUESTION_PASSWORD_RECOVERY =
  'ERROR_FIRST_QUESTION_PASSWORD_RECOVERY'
export const ERROR_SECOND_QUESTION_PASSWORD_RECOVERY =
  'ERROR_SECOND_QUESTION_PASSWORD_RECOVERY'
export const ERROR_FIRST_ANSWER_PASSWORD_RECOVERY =
  'ERROR_FIRST_ANSWER_PASSWORD_RECOVERY'
export const ERROR_SECOND_ANSWER_PASSWORD_RECOVERY =
  'ERROR_SECOND_ANSWER_PASSWORD_RECOVERY'
export const CLEAR_PASSWORD_RECOVERY = 'CLEAR_PASSWORD_RECOVERY'
export const FINISH_PASSWORD_RECOVERY = 'FINISH_PASSWORD_RECOVERY'

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

export function errorFirstQuestion (data) {
  return {
    type: ERROR_FIRST_QUESTION_PASSWORD_RECOVERY,
    data
  }
}

export function errorSecondQuestion (data) {
  return {
    type: ERROR_SECOND_QUESTION_PASSWORD_RECOVERY,
    data
  }
}

export function errorFirstAnswer (data) {
  return {
    type: ERROR_FIRST_ANSWER_PASSWORD_RECOVERY,
    data
  }
}

export function errorSecondAnswer (data) {
  return {
    type: ERROR_SECOND_ANSWER_PASSWORD_RECOVERY,
    data
  }
}

export function clearPasswordRecovery () {
  return {
    type: CLEAR_PASSWORD_RECOVERY
  }
}

export function finishPasswordRecovery () {
  return {
    type: FINISH_PASSWORD_RECOVERY
  }
}
