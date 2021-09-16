import { SceneNames } from '../constants/workflows'
import { Action } from '../types/ReduxTypes'

export interface SceneState {
  readonly currentScene: SceneNames
}

const initialState: SceneState = {
  currentScene: SceneNames.loadingScene
}

// TODO: remove back/next, update to specific scene
export function scene(
  state: SceneState = initialState,
  action: Action
): SceneState {
  switch (action.type) {
    case 'OTP_ERROR':
      return {
        ...state,
        currentScene: SceneNames.otpScene
      }
    case 'START_CHANGE_PASSWORD':
      return {
        ...state,
        currentScene: SceneNames.changePasswordScene
      }
    case 'START_CHANGE_PIN':
      return {
        ...state,
        currentScene: SceneNames.changePinScene
      }
    case 'START_CHANGE_RECOVERY':
      return {
        ...state,
        currentScene: SceneNames.changeRecoveryScene
      }
    case 'NEW_ACCOUNT_WELCOME':
      return {
        ...state,
        currentScene: SceneNames.newAccountWelcomeScene
      }
    case 'NEW_ACCOUNT_USERNAME':
      return {
        ...state,
        currentScene: SceneNames.newAccountUsernameScreen
      }
    case 'NEW_ACCOUNT_PASSWORD':
      return {
        ...state,
        currentScene: SceneNames.newAccountPasswordScreen
      }
    case 'NEW_ACCOUNT_PIN':
      return {
        ...state,
        currentScene: SceneNames.newAccountPinScreen
      }
    case 'NEW_ACCOUNT_WAIT':
      return {
        ...state,
        currentScene: SceneNames.newAccountWaitScreen
      }
    case 'NEW_ACCOUNT_TOS':
      return {
        ...state,
        currentScene: SceneNames.newAccountTOSScreen
      }
    case 'NEW_ACCOUNT_REVIEW':
      return {
        ...state,
        currentScene: SceneNames.newAccountReviewScreen
      }
    case 'START_LANDING':
      return {
        ...state,
        currentScene: SceneNames.landingScene
      }
    case 'START_OTP_REPAIR':
      return {
        ...state,
        currentScene: SceneNames.otpRepairScene
      }
    case 'START_PASSWORD_LOGIN':
      return {
        ...state,
        currentScene: SceneNames.passwordScene
      }
    case 'START_PIN_LOGIN':
      return {
        ...state,
        currentScene: SceneNames.pinScene
      }
    case 'START_RECOVERY_LOGIN':
      return {
        ...state,
        currentScene: SceneNames.recoveryLoginScene
      }
    case 'RESECURE_PASSWORD':
      return {
        ...state,
        currentScene: SceneNames.resecurePasswordScreen
      }
    case 'RESECURE_PIN':
      return {
        ...state,
        currentScene: SceneNames.resecurePinScreen
      }
    case 'START_SECURITY_ALERT':
      return {
        ...state,
        currentScene: SceneNames.securityAlertScene
      }

    case 'RESET_APP':
      return initialState
    default:
      return state
  }
}
