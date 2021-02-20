// @flow

import { type EdgeAccount } from 'edge-core-js'
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
  workflow: WorkflowState,

  // Local reducers:
  +account: EdgeAccount | null,
  +touch: 'FaceID' | 'TouchID' | false
}

export const rootReducer: Reducer<RootState, Action> = combineReducers({
  create,
  login,
  passwordRecovery,
  passwordStatus,
  previousUsers,
  terms,
  workflow,

  account(
    state: EdgeAccount | null = null,
    action: Action
  ): EdgeAccount | null {
    switch (action.type) {
      case 'CREATE_ACCOUNT_SUCCESS':
        return action.data
      case 'START_CHANGE_PASSWORD':
      case 'START_CHANGE_PIN':
      case 'START_RESECURE':
      case 'START_SECURITY_ALERT':
        return action.data
      case 'START_CHANGE_RECOVERY':
      case 'START_OTP_REPAIR':
        return action.data.account
    }
    return state
  },

  touch(state = false, action: Action) {
    return action.type === 'SET_TOUCH' ? action.data : state
  }
})
