// @flow

import { type EdgeRecoveryQuestionChoice } from 'edge-core-js'
import { type Reducer } from 'redux'

import { type Action } from '../types/ReduxTypes.js'

export type PasswordRecoveryState = {
  +questionsList: EdgeRecoveryQuestionChoice[],
  +recoveryKey: string | null,
  +showRecoveryEmailDialog: boolean,
  +userQuestions: string[]
}

const initialState: PasswordRecoveryState = {
  questionsList: [],
  userQuestions: [],
  recoveryKey: null,
  showRecoveryEmailDialog: false
}

export const passwordRecovery: Reducer<
  PasswordRecoveryState,
  Action
> = function(state = initialState, action) {
  switch (action.type) {
    case 'START_CHANGE_RECOVERY':
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
    case 'START_RECOVERY_LOGIN':
      return {
        ...state,
        recoveryKey: action.data.recoveryKey,
        userQuestions: action.data.userQuestions
      }
    case 'DISMISS_EMAIL_MODAL':
      return { ...state, showRecoveryEmailDialog: false }
    default:
      return state
  }
}
