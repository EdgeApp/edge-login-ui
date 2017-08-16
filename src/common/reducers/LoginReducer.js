import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  pin: null,
  loginSuccess: false,
  pinError: null,
  usernameErrorMessage: null,
  passwordErrorMessage: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.LOGIN_USERNAME_PASSWORD:
      return { ...state, loginSuccess: true, loginPasswordErrorMessage: null }
    case Constants.LOGIN_USERNAME_PASSWORD_FAIL:
      return { ...state, loginPasswordErrorMessage: action.data }

    default:
      return state
  }
}
