// @flow

import { type Reducer } from 'redux'

import { type WorkflowName, workflows } from '../constants/workflows.js'
import { type Action } from '../types/ReduxTypes.js'

export type WorkflowState = {
  +currentKey: WorkflowName,
  +currentSceneIndex: number,
  +showModal: boolean
}

const initialState: WorkflowState = {
  currentKey: 'loadingWF',
  currentSceneIndex: 0,
  showModal: false
}

export const workflow: Reducer<WorkflowState, Action> = function(
  state = initialState,
  action
) {
  switch (action.type) {
    // Generic workflow actions:
    case 'WORKFLOW_START':
      return { ...state, currentKey: action.data, currentSceneIndex: 0 }
    case 'WORKFLOW_BACK': {
      let { currentSceneIndex } = state
      if (currentSceneIndex > 0) {
        --currentSceneIndex
      }
      return { ...state, currentSceneIndex }
    }
    case 'WORKFLOW_NEXT': {
      let { currentSceneIndex } = state
      if (currentSceneIndex + 1 < workflows[state.currentKey].length) {
        ++currentSceneIndex
      }
      return { ...state, currentSceneIndex, showModal: false }
    }
    case 'WORKFLOW_LAUNCH_MODAL':
      return { ...state, showModal: true }
    case 'WORKFLOW_CANCEL_MODAL':
      return { ...state, showModal: false }

    // Specific actions with implicit scene changes:
    case 'SET_PREVIOUS_USERS':
      return { ...state, showModal: false }
    case 'OTP_ERROR':
      return { ...state, currentKey: 'otpWF', currentSceneIndex: 0 }
    case 'ON_RECOVERY_LOGIN_IS_ENABLED':
      return { ...state, currentKey: 'recoveryLoginWF', currentSceneIndex: 0 }
    case 'SET_RECOVERY_KEY':
      return { ...state, currentKey: 'recoveryLoginWF', currentSceneIndex: 0 }
    case 'START_RESECURE':
      return { ...state, currentKey: 'resecureWF', currentSceneIndex: 0 }
    case 'CANCEL_RECOVERY_KEY':
      return { ...state, currentKey: 'passwordWF', currentSceneIndex: 0 }
    case 'RESET_APP':
      return initialState
    default:
      return state
  }
}
