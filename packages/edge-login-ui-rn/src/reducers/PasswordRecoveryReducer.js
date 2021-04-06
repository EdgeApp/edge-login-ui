// @flow

import { type EdgeRecoveryQuestionChoice } from 'edge-core-js'
import { type Reducer } from 'redux'

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

export const passwordRecovery: Reducer<
  PasswordRecoveryState,
  Action
> = function (state = initialState, action) {
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
