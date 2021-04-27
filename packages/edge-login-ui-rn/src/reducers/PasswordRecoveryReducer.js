// @flow

import { type EdgeRecoveryQuestionChoice } from 'edge-core-js'

import { type Action } from '../types/ReduxTypes.js'

export type PasswordRecoveryState = {|
  +questionsList: EdgeRecoveryQuestionChoice[], // For changing settings
  +recoveryKey?: string, // For login
  +userQuestions: string[] // For login & changing settings
|}

const initialState: PasswordRecoveryState = {
  questionsList: [],
  userQuestions: []
}

export function passwordRecovery(
  state: PasswordRecoveryState = initialState,
  action: Action
): PasswordRecoveryState {
  switch (action.type) {
    case 'START_CHANGE_RECOVERY':
      return {
        ...state,
        questionsList: action.data.questionsList,
        userQuestions: action.data.userQuestions
      }
    case 'START_RECOVERY_LOGIN':
      return {
        ...state,
        recoveryKey: action.data.recoveryKey,
        userQuestions: action.data.userQuestions
      }
    default:
      return state
  }
}
