// @flow

import { type Reducer } from 'redux'

import { type Action } from '../../types/ReduxTypes'

export type PasswordRecoveryState = {
  +questionsList: Array<string>,
  +recoveryErrorMessage: string | null,
  +recoveryKey: string | null,
  +showRecoveryEmailDialog: boolean,
  +userQuestions: Array<string>
}

const initialState: PasswordRecoveryState = {
  questionsList: [],
  userQuestions: [],
  recoveryKey: null,
  recoveryLoginEnabledError: false,
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
    case 'ON_RECOVERY_LOGIN_NOT_ENABLED':
      return {
        ...state,
        recoveryLoginEnabledError: true,
        recoveryErrorMessage: action.data
      }
    case 'DISMISS_REOVERY_ERROR':
      return {
        ...state,
        recoveryLoginEnabledError: false,
        recoveryErrorMessage: null
      }
    case 'DISMISS_EMAIL_MODAL':
      return { ...state, showRecoveryEmailDialog: false }
    default:
      return state
  }
}
