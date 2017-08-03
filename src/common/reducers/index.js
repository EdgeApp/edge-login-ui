import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import PreviousUsersReducer from './PreviousUsersReducer'

export default combineReducers({
  login: LoginReducer,
  previousUsers: PreviousUsersReducer
})
