import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  confirmPassword: null,
  pin: '1111',
  loginSuccess: false,
  creationSuccess: false,
  passwordStatus: null,
  pinError: null,
  usernameErrorMessage: null,
  confirmPasswordErrorMessage: null,
  createErrorMessage: null,
  loginPasswordErrorMessage: null,
  loginPinErrorMessage: null,
  accountObject: null
}
export default function (state = initialState, action) {
  let em = null
  switch (action.type) {
    case Constants.CREATE_ACCOUNT_SUCCESS:
      return { ...state, accountObject: action.data, creationSuccess: true }
    case Constants.LOGIN_USERNAME_PASSWORD:
      return { ...state, loginSuccess: true }
    case Constants.AUTH_UPDATE_USERNAME:
      return {
        ...state,
        username: action.data.username,
        usernameErrorMessage: action.data.error
      }
    case Constants.AUTH_UPDATE_PASSWORD:
      if (state.confirmPassword !== action.data.password) {
        em = 'ERROR MESSAGE'
      }
      return {
        ...state,
        password: action.data.password,
        passwordStatus: action.data.passwordStatus,
        confirmPasswordErrorMessage: em
      }
    case Constants.AUTH_UPDATE_CONFIRM_PASSWORD:
      if (state.password !== action.data) {
        em = 'ERROR MESSAGE'
      }
      return {
        ...state,
        confirmPassword: action.data,
        confirmPasswordErrorMessage: em
      }

    default:
      return state
  }
}
