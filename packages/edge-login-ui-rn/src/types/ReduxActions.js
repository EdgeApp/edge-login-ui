// @flow

import {
  type EdgeAccount,
  type EdgePasswordRules,
  type OtpError
} from 'edge-core-js'

import { type PreviousUsersState } from '../reducers/PreviousUsersReducer.js'
import { type RootState } from '../reducers/RootReducer.js'
import { type LoginAttempt } from '../util/loginAttempt.js'

// Actions with no payload:
type NoDataActionName =
  | 'AUTH_LOGGING_IN_WITH_PIN'
  | 'CLEAR_CREATE_ERROR_MESSAGE'
  | 'DISMISS_EMAIL_MODAL'
  | 'LOGIN_SUCCEESS'
  | 'ON_DISABLE_RECOVERY'
  | 'RESET_APP'
  | 'START_CREATE_ACCOUNT'
  | 'START_LANDING'
  | 'START_PASSWORD_LOGIN'
  | 'START_PIN_LOGIN'
  | 'WORKFLOW_BACK'
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
  | { type: 'ON_RECOVERY_KEY', data: string }
  | {
      type: 'OTP_ERROR',
      data: {
        attempt: LoginAttempt,
        error: OtpError
      }
    }
  | {
      type: 'START_OTP_REPAIR',
      data: {
        account: EdgeAccount,
        error: OtpError
      }
    }
  | { type: 'OTP_RESET_REQUEST', data: Date }
  | { type: 'SET_PREVIOUS_USERS', data: PreviousUsersState }
  | { type: 'SET_TOUCH', data: $PropertyType<RootState, 'touch'> }
  | { type: 'START_CHANGE_PASSWORD', data: EdgeAccount }
  | { type: 'START_CHANGE_PIN', data: EdgeAccount }
  | {
      type: 'START_CHANGE_RECOVERY',
      data: {
        questionsList: string[],
        userQuestions: string[],
        account: EdgeAccount
      }
    }
  | {
      type: 'START_RECOVERY_LOGIN',
      data: {
        username: string,
        recoveryKey: string,
        userQuestions: string[]
      }
    }
  | { type: 'START_RESECURE', data: EdgeAccount }
  | { type: 'START_SECURITY_ALERT', data: EdgeAccount }
  | { type: 'UPDATE_WAIT_TIMER', data: { seconds: number } } // Apparently unused
