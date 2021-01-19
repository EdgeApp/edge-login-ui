// @flow

import { type Reducer } from 'redux'

import { type WorkflowName, workflows } from '../constants/workflows.js'
import { type Action } from '../types/ReduxTypes.js'

export type WorkflowState = {
  +currentKey: WorkflowName,
  +currentSceneIndex: number
}

const initialState: WorkflowState = {
  currentKey: 'loadingWF',
  currentSceneIndex: 0
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
      return { ...state, currentSceneIndex }
    }

    // Specific actions with implicit scene changes:
    case 'SET_PREVIOUS_USERS':
      return { ...state }
    case 'OTP_ERROR':
      return { ...state, currentKey: 'otpWF', currentSceneIndex: 0 }

    // Actions for launching screens:
    case 'START_CHANGE_PASSWORD':
      return { ...state, currentKey: 'changePasswordWF', currentSceneIndex: 0 }
    case 'START_CHANGE_PIN':
      return { ...state, currentKey: 'changePinWF', currentSceneIndex: 0 }
    case 'START_CHANGE_RECOVERY':
      return { ...state, currentKey: 'changeRecoveryWF', currentSceneIndex: 0 }
    case 'START_RECOVERY_LOGIN':
      return { ...state, currentKey: 'recoveryLoginWF', currentSceneIndex: 0 }
    case 'START_RESECURE':
      return { ...state, currentKey: 'resecureWF', currentSceneIndex: 0 }
    case 'START_SECURITY_ALERT':
      return { ...state, currentKey: 'securityAlertWF', currentSceneIndex: 0 }

    case 'RESET_APP':
      return initialState
    default:
      return state
  }
}
