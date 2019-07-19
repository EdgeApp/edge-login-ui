import { USER_LOGIN } from '../actions/Login.action'
import * as ACTION from '../actions/User.action'

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
