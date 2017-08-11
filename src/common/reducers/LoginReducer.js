import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  confirmPassword: null,
  pin: null,
  usernameErrorMessage: null,
  passwordStatus: null,
  confirmPasswordErrorMessage: null,
  createErrorMessage: null,
  loginPasswordErrorMessage: null,
  loginPinErrorMessage: null,
  loginSuccess: false
}
export default function (state = initialState, action) {
  let em = null
  switch (action.type) {
    case Constants.LOGIN_USERNAME_PASSWORD:
      return { ...state, loginSuccess: true }
    case Constants.AUTH_UPDATE_USERNAME:
      return {
        ...state,
        username: action.data.username,
        usernameErrorMessage: action.data.error
      }
    case Constants.AUTH_UPDATE_PASSWORD:
      console.log('IPDATE PASSWORD YO>')
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
