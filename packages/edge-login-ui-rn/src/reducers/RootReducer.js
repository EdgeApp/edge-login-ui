// @flow

import { type Reducer, combineReducers } from 'redux'

import { type Action } from '../types/ReduxTypes.js'
import { type CreateState, create } from './CreateUserReducer.js'
import { type LoginState, login } from './LoginReducer.js'
import {
  type PasswordRecoveryState,
  passwordRecovery
} from './PasswordRecoveryReducer'
import {
  type PasswordStatusState,
  passwordStatus
} from './PasswordStatusReducer'
import { type PreviousUsersState, previousUsers } from './PreviousUsersReducer'
import { type TermsState, terms } from './TermsAndConditinsReducer'
import { type WorkflowState, workflow } from './WorkflowReducer'

export type RootState = {
  create: CreateState,
  login: LoginState,
  passwordRecovery: PasswordRecoveryState,
  passwordStatus: PasswordStatusState | null,
  previousUsers: PreviousUsersState,
  terms: TermsState,
  workflow: WorkflowState
}

export const rootReducer: Reducer<RootState, Action> = combineReducers({
  create,
  login,
  passwordRecovery,
  passwordStatus,
  previousUsers,
  terms,
  workflow
})
