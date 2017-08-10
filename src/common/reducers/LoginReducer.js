import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  pin: null,
  usernameErrorMessage: null,
  passwordErrorMessage: null,
  createErrorMessage: null,
  loginPasswordErrorMessage: null,
  loginPinErrorMessage: null,
  loginSuccess: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.LOGIN_USERNAME_PASSWORD:
      return { ...state, loginSuccess: true }
    case Constants.AUTH_UPDATE_USERNAME:
      console.log('IN REDUCER ')
      console.log(action.data)
      return {
        ...state,
        username: action.data.username,
        usernameErrorMessage: action.data.error
      }
    default:
      return state
  }
}
