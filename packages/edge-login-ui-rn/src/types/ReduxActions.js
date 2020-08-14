// @flow

import {
  type EdgeAccount,
  type EdgePasswordRules,
  type OtpError
} from 'edge-core-js'

import { type WorkflowName } from '../constants/workflows.js'
import { type PreviousUsersState } from '../reducers/PreviousUsersReducer.js'
import { type RootState } from '../reducers/RootReducer.js'
import { type LoginAttempt } from '../util/loginAttempt.js'

// Actions with no payload:
type NoDataActionName =
  | 'AUTH_LOGGING_IN_WITH_PIN'
  | 'CANCEL_RECOVERY_KEY'
  | 'CLEAR_CREATE_ERROR_MESSAGE'
  | 'CLOSE_NOTIFICATION_MODAL'
  | 'DISMISS_EMAIL_MODAL'
  | 'DISMISS_REOVERY_ERROR' // Apparently unused
  | 'LAUNCH_NOTIFICATION_MODAL'
  | 'LOGIN_SUCCEESS'
  | 'ON_DISABLE_RECOVERY'
  | 'RESET_APP'
  | 'WORKFLOW_BACK'
  | 'WORKFLOW_CANCEL_MODAL'
  | 'WORKFLOW_LAUNCH_MODAL'
  | 'WORKFLOW_NEXT'

export type Action =
  | { type: NoDataActionName }
  // Actions with known payloads:
  | {
      type: 'AUTH_UPDATE_CONFIRM_PASSWORD',
      data: {
        password: ?string,
        error: string | null
      }
    }
  | { type: 'AUTH_UPDATE_LOGIN_PASSWORD', data: string }
  | {
      type: 'AUTH_UPDATE_PASSWORD',
      data: {
        password: string,
        passwordStatus: EdgePasswordRules,
        passwordCheckString: string,
        error: string | null
      }
    }
  | { type: 'AUTH_UPDATE_PIN', data: string }
  | { type: 'AUTH_UPDATE_USERNAME', data: string }
  | { type: 'CREATE_ACCOUNT_FAIL', data: string /* error */ }
  | { type: 'CREATE_ACCOUNT_SUCCESS', data: EdgeAccount }
  | {
      type: 'CREATE_UPDATE_PIN',
      data: {
        pin: string,
        error: string | null
      }
    }
  | {
      type: 'CREATE_UPDATE_USERNAME',
      data: { username: string, error: string | null }
    }
  | {
      type: 'LOGIN_PIN_FAIL',
      data: {
        message: string,
        wait: number
      }
    }
  | { type: 'LOGIN_USERNAME_PASSWORD_FAIL', data: string /* error */ }
  | { type: 'ON_RECOVERY_KEY', data: string }
  | { type: 'ON_RECOVERY_LOGIN_ERROR', data: string }
  | {
      type: 'ON_RECOVERY_LOGIN_IS_ENABLED',
      data: {
        recoveryKey: string,
        userQuestions: string[]
      }
    }
  | { type: 'ON_RECOVERY_LOGIN_NOT_ENABLED', data?: string /* error */ }
  | {
      type: 'OTP_ERROR',
      data: {
        attempt: LoginAttempt,
        error: OtpError
      }
    }
  | { type: 'OTP_RESET_REQUEST', data: Date }
  | {
      type: 'PASSWORD_RECOVERY_INITIALIZED',
      data: {
        questionsList: string[],
        userQuestions: string[],
        account: EdgeAccount,
        username: string
      }
    }
  | { type: 'SET_PREVIOUS_USERS', data: PreviousUsersState }
  | { type: 'SET_RECOVERY_KEY', data: string }
  | { type: 'SET_TOUCH', data: $PropertyType<RootState, 'touch'> }
  | { type: 'START_RESECURE', data: EdgeAccount }
  | { type: 'UPDATE_WAIT_TIMER', data: { seconds: number } } // Apparently unused
  | { type: 'WORKFLOW_START', data: WorkflowName }
