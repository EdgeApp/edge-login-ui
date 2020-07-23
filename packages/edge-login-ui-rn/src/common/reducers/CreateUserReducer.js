// @flow

import { type EdgeAccount, type EdgePasswordRules } from 'edge-core-js'
import { type Reducer } from 'redux'

import { type Action } from '../../types/ReduxTypes'

export type CreateState = {
  +accountObject: EdgeAccount | null,
  +confirmPassword: string | null,
  +confirmPasswordErrorMessage: string | null,
  +createErrorMessage: string | null,
  +createPasswordErrorMessage: string | null,
  +creationSuccess: boolean,
  +password: string | null,
  +passwordStatus: EdgePasswordRules | null,
  +pin: string,
  +pinError: string,
  +pinErrorMessage: string | null,
  +showModal: boolean,
  +username: string | null,
  +usernameErrorMessage: string | null
}

const initialState: CreateState = {
  username: null,
  password: null,
  confirmPassword: null,
  pin: '',
  pinError: '',
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

export const create: Reducer<CreateState, Action> = function(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'CREATE_ACCOUNT_SUCCESS':
      return { ...state, accountObject: action.data, creationSuccess: true }
    case 'CREATE_ACCOUNT_FAIL':
      return { ...state, createErrorMessage: action.data }
    case 'CLEAR_CREATE_ERROR_MESSAGE':
      return { ...state, createErrorMessage: null }
    case 'CREATE_UPDATE_USERNAME':
      return {
        ...state,
        username: action.data.username,
        usernameErrorMessage: action.data.error
      }
    case 'CREATE_UPDATE_PIN':
      return {
        ...state,
        pin: action.data.pin,
        pinErrorMessage: action.data.error
      }
    case 'AUTH_UPDATE_PASSWORD':
      return {
        ...state,
        password: action.data.password,
        passwordStatus: action.data.passwordStatus,
        createPasswordErrorMessage: action.data.error
      }
    case 'AUTH_UPDATE_PIN':
      return { ...state, loginPin: action.data }
    case 'LAUNCH_NOTIFICATION_MODAL':
      return { ...state, showModal: true }
    case 'CLOSE_NOTIFICATION_MODAL':
      return { ...state, showModal: false }
    case 'AUTH_UPDATE_CONFIRM_PASSWORD':
      return {
        ...state,
        confirmPassword: action.data.password,
        confirmPasswordErrorMessage: action.data.error
      }
    case 'RESET_APP':
      return initialState
    default:
      return state
  }
}
