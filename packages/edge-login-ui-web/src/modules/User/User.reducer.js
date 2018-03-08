import { USER_LOGIN } from '../Login/Login.action'
import * as ACTION from './User.action'

export const user = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.data

    case ACTION.USER_LOGOUT:
      return {}

    default:
      return state
  }
}
