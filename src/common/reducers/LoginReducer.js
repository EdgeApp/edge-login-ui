import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  pin: null,
  loginSuccess: false,
  errorMessage: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.SET_PREVIOUS_USERS:
      if (action.data.lastUser) {
        return { ...state, username: action.data.lastUser.username }
      }
      if (typeof action.data.usersWithPinList !== 'undefined' && action.data.usersWithPinList.length > 0) {
        const topUser = action.data.usersWithPinList[0]
        return { ...state, username: topUser.username }
      }
      return state
    case Constants.AUTH_UPDATE_USERNAME:
      return { ...state, username: action.data }
    case Constants.AUTH_UPDATE_PIN:
      return { ...state, pin: action.data }
    case Constants.LOGIN_SUCCEESS:
      return { ...state, loginSuccess: true, loginPasswordErrorMessage: null }
    case Constants.LOGIN_USERNAME_PASSWORD_FAIL:
      return { ...state, errorMessage: action.data, pin: '' }

    default:
      return state
  }
}
