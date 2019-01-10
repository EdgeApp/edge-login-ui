// @flow

import { combineReducers } from 'redux'

import CreateUserReducer from './CreateUserReducer'
import LoginReducer from './LoginReducer'
import PasswordRecoveryReducer from './PasswordRecoveryReducer'
import PasswordStatusReducer from './PasswordStatusReducer'
import PreviousUsersReducer from './PreviousUsersReducer'
import TermsAndConditinsReducer from './TermsAndConditinsReducer'
import WorkflowReducer from './WorkflowReducer'

export default combineReducers({
  login: LoginReducer,
  create: CreateUserReducer,
  previousUsers: PreviousUsersReducer,
  workflow: WorkflowReducer,
  passwordStatus: PasswordStatusReducer,
  terms: TermsAndConditinsReducer,
  passwordRecovery: PasswordRecoveryReducer
})
