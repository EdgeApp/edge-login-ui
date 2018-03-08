// @flow

import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import CreateUserReducer from './CreateUserReducer'
import PreviousUsersReducer from './PreviousUsersReducer'
import WorkflowReducer from './WorkflowReducer'
import PasswordStatusReducer from './PasswordStatusReducer'
import TermsAndConditinsReducer from './TermsAndConditinsReducer'
import PasswordRecoveryReducer from './PasswordRecoveryReducer'

export default combineReducers({
  login: LoginReducer,
  create: CreateUserReducer,
  previousUsers: PreviousUsersReducer,
  workflow: WorkflowReducer,
  passwordStatus: PasswordStatusReducer,
  terms: TermsAndConditinsReducer,
  passwordRecovery: PasswordRecoveryReducer
})
