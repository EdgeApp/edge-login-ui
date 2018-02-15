import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  confirmPassword: null,
  pin: '',
  loginPin: null,
  loginSuccess: false,
  creationSuccess: false,
  passwordStatus: null,
  createPasswordErrorMessage: null,
  confirmPasswordErrorMessage: null,
  pinErrorMessage: null,
  usernameErrorMessage: null,
  createErrorMessage: null,
  loginPasswordErrorMessage: null,
  loginPinErrorMessage: null,
  accountObject: null,
  showModal: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.CREATE_ACCOUNT_SUCCESS:
      return { ...state, accountObject: action.data, creationSuccess: true }
    case Constants.CREATE_ACCOUNT_FAIL:
      return { ...state, createErrorMessage: action.data }
    case Constants.CREATE_UPDATE_USERNAME:
      return {
        ...state,
        username: action.data.username,
        usernameErrorMessage: action.data.error
      }
    case Constants.CREATE_UPDATE_PIN:
      return {
        ...state,
        pin: action.data.pin,
        pinErrorMessage: action.data.error
      }
    case Constants.AUTH_UPDATE_PASSWORD:
      return {
        ...state,
        password: action.data.password,
        passwordStatus: action.data.passwordStatus,
        createPasswordErrorMessage: action.data.error
      }
    case Constants.AUTH_UPDATE_PIN:
      return { ...state, loginPin: action.data }
    case Constants.LAUNCH_NOTIFICATION_MODAL:
      return { ...state, showModal: true }
    case Constants.CLOSE_NOTIFICATION_MODAL:
      return { ...state, showModal: false }
    case Constants.AUTH_UPDATE_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: action.data.password,
        confirmPasswordErrorMessage: action.data.error
      }
    case Constants.RESET_APP:
      return initialState
    default:
      return state
  }
}
