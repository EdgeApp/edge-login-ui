import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  pin: null,
  loginSuccess: false,
  errorMessage: null,
  isLoggingInWithPin: false,
  otpResetToken: null,
  otpResetDate: null,
  otpUserBackupKey: null, // S7UQ66VYNZKAX4EV
  previousAttemptType: null,
  edgeLoginId: null,
  cancelEdgeLoginRequest: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.SET_PREVIOUS_USERS:
      if (action.data.lastUser) {
        return { ...state, username: action.data.lastUser.username }
      }
      if (
        typeof action.data.usersWithPinList !== 'undefined' &&
        action.data.usersWithPinList.length > 0
      ) {
        const topUser = action.data.usersWithPinList[0]
        return { ...state, username: topUser.username }
      }
      return state
    case Constants.AUTH_UPDATE_USERNAME:
      return { ...state, username: action.data }
    case Constants.AUTH_UPDATE_PIN:
      return { ...state, pin: action.data }
    case Constants.LOGIN_SUCCEESS:
      return {
        ...state,
        loginSuccess: true,
        loginPasswordErrorMessage: null,
        isLoggingInWithPin: false
      }
    case Constants.LOGIN_USERNAME_PASSWORD_FAIL:
      return {
        ...state,
        errorMessage: action.data,
        pin: '',
        isLoggingInWithPin: false
      }
    case Constants.AUTH_LOGGING_IN_WITH_PIN:
      return { ...state, isLoggingInWithPin: true }
    case Constants.AUTH_UPDATE_OTP_BACKUP_KEY:
      return { ...state, otpUserBackupKey: action.data }
    case Constants.AUTH_UPDATE_LOGIN_PASSWORD:
      return {...state, password: action.data}
    case Constants.OTP_ERROR:
      return {
        ...state,
        otpResetToken: action.data.resetToken,
        otpResetDate: action.data.resetDate,
        previousAttemptType: action.data.loginAttempt
      }
    case Constants.START_EDGE_LOGIN_REQUEST:
      return {
        ...state,
        edgeLoginId: action.data.id,
        cancelEdgeLoginRequest: action.data.cancelRequest
      }
    case Constants.CANCEL_EDGE_LOGIN_REQUEST:
      return {
        ...state,
        edgeLoginId: null,
        cancelEdgeLoginRequest: null
      }
    case Constants.RESET_APP:
      const username = state.username
      return {...initialState, username: username}
    default:
      return state
  }
}
