import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  pin: null,
  loginSuccess: false,
  errorMessage: null,
  otpErrorMessage: null,
  isLoggingInWithPin: false,
  otpResetToken: null,
  otpResetDate: null,
  otpUserBackupKey: null, // S7UQ66VYNZKAX4EV
  recoveryToken: null,
  previousAttemptType: null,
  edgeLoginId: null,
  cancelEdgeLoginRequest: null,
  account: null,
  touchIdInformation: null,
  showRecoverSuccessDialog: false,
  wait: 0
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.CANCEL_RECOVERY_KEY:
      return { ...state, recoveryToken: null }
    case Constants.START_RECOVERY_LOGIN:
      return { ...state, otpErrorMessage: null }
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
      return { ...state, username: action.data, errorMessage: null, wait: 0 }
    case Constants.UPDATE_WAIT_TIMER:
      return { ...state, wait: action.data.seconds }
    case Constants.AUTH_UPDATE_PIN:
      return { ...state, pin: action.data, errorMessage: null }
    case Constants.LOGIN_SUCCEESS:
      return {
        ...state,
        loginSuccess: true,
        loginPasswordErrorMessage: null,
        isLoggingInWithPin: false,
        errorMessage: null,
        otpErrorMessage: null,
        wait: 0
      }
    case Constants.LOGIN_USERNAME_PASSWORD_FAIL:
      return {
        ...state,
        errorMessage: action.data,
        pin: '',
        isLoggingInWithPin: false
      }
    case Constants.LOGIN_PIN_FAIL:
      return {
        ...state,
        errorMessage: action.data.message,
        wait: action.data.wait,
        pin: '',
        isLoggingInWithPin: false
      }
    case Constants.OTP_LOGIN_BACKUPKEY_FAIL:
      return {
        ...state,
        otpErrorMessage: action.data,
        errorMessage: null
      }
    case Constants.AUTH_LOGGING_IN_WITH_PIN:
      return { ...state, isLoggingInWithPin: true }
    case Constants.AUTH_UPDATE_OTP_BACKUP_KEY:
      return { ...state, otpUserBackupKey: action.data }
    case Constants.AUTH_UPDATE_LOGIN_PASSWORD:
      return { ...state, password: action.data, errorMessage: null }
    case Constants.OTP_ERROR:
      return {
        ...state,
        otpResetToken: action.data.resetToken,
        otpResetDate: action.data.resetDate,
        previousAttemptType: action.data.loginAttempt
      }
    case Constants.OTP_RESET_REQUEST:
      return {
        ...state,
        otpResetDate: action.data
      }
    case Constants.START_EDGE_LOGIN_REQUEST:
      return {
        ...state,
        edgeLoginId: 'airbitz://edge/' + action.data.id,
        cancelEdgeLoginRequest: action.data.cancelRequest
      }
    case Constants.CANCEL_EDGE_LOGIN_REQUEST:
      return {
        ...state,
        edgeLoginId: null,
        cancelEdgeLoginRequest: null
      }
    case Constants.SET_RECOVERY_KEY:
      return { ...state, recoveryToken: action.data }
    case Constants.RESET_APP:
      const username = state.username
      return { ...initialState, username: username }
    case Constants.LOGIN_RECOVERY_SUCCEESS:
      return {
        ...state,
        account: action.data.account,
        touchIdInformation: action.data.touchIdInformation,
        showRecoverSuccessDialog: true
      }
    case Constants.ON_RECOVERY_LOGIN_ERROR:
      return { ...state, errorMessage: action.data }
    case Constants.PASSWORD_RECOVERY_INITIALIZED:
      return {
        ...state,
        account: action.data.account,
        username: action.data.username
      }
    default:
      return state
  }
}
