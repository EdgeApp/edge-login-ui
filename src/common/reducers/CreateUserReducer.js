import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  confirmPassword: null,
  pin: null,
  loginPin: null,
  loginSuccess: false,
  creationSuccess: false,
  passwordStatus: null,
  createPasswordErrorMessage: null,
  confirmPasswordErrorMessage: null,
  pinError: null,
  usernameErrorMessage: null,
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
    case Constants.CREATE_ACCOUNT_FAIL:
      return { ...state, createErrorMessage: action.data }
    case Constants.LOGIN_USERNAME_PASSWORD:
      return { ...state, loginSuccess: true, loginPasswordErrorMessage: null }
    case Constants.LOGIN_USERNAME_PASSWORD_FAIL:
      console.log('WE HAVE PASSWORD ERROR ')
      return { ...state, loginPasswordErrorMessage: action.data }
    case Constants.AUTH_UPDATE_USERNAME:
      return {
        ...state,
        username: action.data.username,
        usernameErrorMessage: action.data.error
      }
    case Constants.AUTH_UPDATE_PASSWORD:
      console.log('UPDATE PASSWORD ')
      if (state.confirmPassword !== action.data.password) {
        em = 'ERROR MESSAGE'
      }
      if (action.data.error) {
        em = action.data.error
      }
      console.log('EM ' + em)
      return {
        ...state,
        password: action.data.password,
        passwordStatus: action.data.passwordStatus,
        createPasswordErrorMessage: em
      }
    case Constants.AUTH_UPDATE_PIN:
      return { ...state, loginPin: action.data }
    case Constants.AUTH_UPDATE_CONFIRM_PASSWORD:
      if (state.password !== action.data.password) {
        em = 'ERROR MESSAGE'
      }
      if (action.data.error) {
        em = action.data.error
      }
      return {
        ...state,
        confirmPassword: action.data.password,
        createPasswordErrorMessage: em,
        confirmPasswordErrorMessage: em
      }

    default:
      return state
  }
}
