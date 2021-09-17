import { Action } from '../types/ReduxTypes'
import { SceneNames } from '../types/Scenes'

export interface SceneState {
  readonly currentScene: SceneNames
}

const initialState: SceneState = {
  currentScene: 'LoadingScene'
}

export function scene(
  state: SceneState = initialState,
  action: Action
): SceneState {
  switch (action.type) {
    case 'OTP_ERROR':
      return {
        currentScene: 'OtpScene'
      }
    case 'START_CHANGE_PASSWORD':
      return {
        currentScene: 'ChangePasswordScene'
      }
    case 'START_CHANGE_PIN':
      return {
        currentScene: 'ChangePinScene'
      }
    case 'START_CHANGE_RECOVERY':
      return {
        currentScene: 'ChangeRecoveryScene'
      }
    case 'NEW_ACCOUNT_WELCOME':
      return {
        currentScene: 'NewAccountWelcomeScene'
      }
    case 'NEW_ACCOUNT_USERNAME':
      return {
        currentScene: 'NewAccountUsernameScene'
      }
    case 'NEW_ACCOUNT_PASSWORD':
      return {
        currentScene: 'NewAccountPasswordScene'
      }
    case 'NEW_ACCOUNT_PIN':
      return {
        currentScene: 'NewAccountPinScene'
      }
    case 'NEW_ACCOUNT_WAIT':
      return {
        currentScene: 'NewAccountWaitScene'
      }
    case 'NEW_ACCOUNT_TOS':
      return {
        currentScene: 'NewAccountTosScene'
      }
    case 'NEW_ACCOUNT_REVIEW':
      return {
        currentScene: 'NewAccountReviewScene'
      }
    case 'START_LANDING':
      return {
        currentScene: 'LandingScene'
      }
    case 'START_OTP_REPAIR':
      return {
        currentScene: 'OtpRepairScene'
      }
    case 'START_PASSWORD_LOGIN':
      return {
        currentScene: 'PasswordScene'
      }
    case 'START_PIN_LOGIN':
      return {
        currentScene: 'PinScene'
      }
    case 'START_RECOVERY_LOGIN':
      return {
        currentScene: 'RecoveryLoginScene'
      }
    case 'RESECURE_PASSWORD':
      return {
        currentScene: 'ResecurePasswordScene'
      }
    case 'RESECURE_PIN':
      return {
        currentScene: 'ResecurePinScene'
      }
    case 'START_SECURITY_ALERT':
      return {
        currentScene: 'SecurityAlertScene'
      }

    case 'RESET_APP':
      return initialState
    default:
      return state
  }
}
