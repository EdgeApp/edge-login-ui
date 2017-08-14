import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import PreviousUsersReducer from './PreviousUsersReducer'
import WorkflowReducer from './WorkflowReducer'
import PasswordStatusReducer from './PasswordStatusReducer'

export default combineReducers({
  login: LoginReducer,
  previousUsers: PreviousUsersReducer,
  workflow: WorkflowReducer,
  passwordStatus: PasswordStatusReducer
})
