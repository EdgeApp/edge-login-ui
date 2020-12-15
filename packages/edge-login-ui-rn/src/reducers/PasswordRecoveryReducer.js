// @flow

import { type Reducer } from 'redux'

import { type Action } from '../types/ReduxTypes.js'

export type PasswordRecoveryState = {
  +questionsList: string[],
  +recoveryErrorMessage: string | null,
  +recoveryKey: string | null,
  +showRecoveryEmailDialog: boolean,
  +userQuestions: string[]
}

const initialState: PasswordRecoveryState = {
  questionsList: [],
  userQuestions: [],
  recoveryKey: null,
  recoveryErrorMessage: null,
  showRecoveryEmailDialog: false
}

export const passwordRecovery: Reducer<
  PasswordRecoveryState,
  Action
> = function(state = initialState, action) {
  switch (action.type) {
    case 'PASSWORD_RECOVERY_INITIALIZED':
      return {
        ...state,
        questionsList: action.data.questionsList,
        userQuestions: action.data.userQuestions
      }
    case 'ON_DISABLE_RECOVERY':
      return { ...state, recoveryKey: null, userQuestions: [] }
    case 'ON_RECOVERY_KEY':
      return {
        ...state,
        recoveryKey: action.data,
        showRecoveryEmailDialog: true
      }
    case 'ON_RECOVERY_LOGIN_IS_ENABLED':
      return {
        ...state,
        recoveryKey: action.data.recoveryKey,
        userQuestions: action.data.userQuestions
      }
    case 'DISMISS_REOVERY_ERROR':
      return {
        ...state,
        recoveryErrorMessage: null
      }
    case 'DISMISS_EMAIL_MODAL':
      return { ...state, showRecoveryEmailDialog: false }
    default:
      return state
  }
}
