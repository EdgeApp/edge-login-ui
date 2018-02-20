import * as Constants from '../../common/constants'

const initialState = {
  questionsList: [],
  userQuestions: [],
  recoveryKey: null,
  recoveryLoginEnabledError: false,
  recoveryErrorMessage: null,
  showRecoveryEmailDialog: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.PASSWORD_RECOVERY_INITIALIZED:
      return {
        ...state,
        questionsList: action.data.questionsList,
        userQuestions: action.data.userQuestions
      }
    case Constants.ON_DISABLE_RECOVERY:
      return { ...state, recoveryKey: null, userQuestions: [] }
    case Constants.ON_RECOVERY_KEY:
      return {
        ...state,
        recoveryKey: action.data,
        showRecoveryEmailDialog: true
      }
    case Constants.ON_RECOVERY_LOGIN_IS_ENABLED:
      return {
        ...state,
        recoveryKey: action.data.recoveryKey,
        userQuestions: action.data.userQuestions
      }
    case Constants.ON_RECOVERY_LOGIN_NOT_ENABLED:
      return {
        ...state,
        recoveryLoginEnabledError: true,
        recoveryErrorMessage: action.data
      }
    case Constants.DISMISS_REOVERY_ERROR:
      return {
        ...state,
        recoveryLoginEnabledError: false,
        recoveryErrorMessage: null
      }
    case Constants.DISMISS_EMAIL_MODAL:
      return { ...state, showRecoveryEmailDialog: false }
    default:
      return state
  }
}
