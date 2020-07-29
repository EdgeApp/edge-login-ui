// @flow

import { type Reducer } from 'redux'

import s from '../common/locales/strings.js'
import * as Constants from '../constants/index.js'
import { type Action } from '../types/ReduxTypes.js'

export type WorkflowState = {
  +currentKey: string,
  +currentSceneIndex: number,
  +details: Array<Object>,
  +showModal: boolean
}

const initialState: WorkflowState = {
  currentKey: 'firstLoadWF',
  currentSceneIndex: 0,
  details: [],
  showModal: false,
  modalView: null,
  firstLoadWF: {
    scenes: 1,
    details: [{ back: false, skip: false, title: '', subTitle: '' }]
  },
  initalizeWF: {
    scenes: 1,
    details: [{ back: false, skip: false, title: '', subTitle: '' }]
  },
  createWF: {
    scenes: 7,
    details: [
      { back: false, skip: false, title: '', subTitle: '' },
      {
        back: true,
        skip: false,
        title: s.strings.choose_title_username,
        subTitle: s.strings.step_one
      },
      {
        back: true,
        skip: false,
        title: s.strings.choose_title_password,
        subTitle: s.strings.step_two
      },
      {
        back: true,
        skip: false,
        title: s.strings.set_four_digit_pin,
        subTitle: s.strings.step_three
      },
      {
        back: false,
        skip: false,
        title: s.strings.create_your_account,
        subTitle: ''
      },
      {
        back: false,
        skip: false,
        title: s.strings.write_it_down,
        subTitle: s.strings.account_confirmation
      },
      {
        back: true,
        skip: false,
        title: s.strings.quick_review,
        subTitle: s.strings.account_confirmation
      }
    ]
  },
  passwordWF: {
    scenes: 1,
    details: [
      {
        back: true,
        skip: false,
        title: s.strings.change_password,
        subTitle: ''
      }
    ]
  },
  pinWF: {
    scenes: 1,
    details: [
      { back: true, skip: false, title: s.strings.change_pin, subTitle: '' }
    ]
  },
  recoveryWF: {
    scenes: 1,
    details: [
      { back: true, skip: false, title: s.strings.recovery, subTitle: '' }
    ]
  },
  fingerprintWF: {
    scenes: 1,
    details: [{ back: false, skip: false, title: '', subTitle: '' }]
  },
  otpWF: {
    scenes: 1,
    details: [
      {
        back: true,
        skip: false,
        title: s.strings.otp_header,
        subTitle: ''
      }
    ]
  },
  recoveryLoginWF: {
    scenes: 3,
    details: [
      {
        back: true,
        skip: false,
        title: s.strings.recovery_questions_header,
        subTitle: ''
      },
      {
        back: true,
        skip: false,
        title: s.strings.change_password,
        subTitle: ''
      },
      {
        back: true,
        skip: false,
        title: s.strings.change_pin,
        subTitle: ''
      }
    ]
  }
}
export const workflow: Reducer<WorkflowState, Action> = function(
  state = initialState,
  action
) {
  let nextIndex
  switch (action.type) {
    case 'SET_PREVIOUS_USERS':
      return { ...state, showModal: false, modalView: null }
    case 'OTP_ERROR':
      return {
        ...state,
        currentKey: Constants.WORKFLOW_OTP,
        currentSceneIndex: 0
      }
    case 'WORKFLOW_START':
      return { ...state, currentKey: action.data, currentSceneIndex: 0 }
    case 'WORKFLOW_BACK':
      nextIndex = state.currentSceneIndex - 1
      if (nextIndex === -1) {
        nextIndex = 0
      }
      return { ...state, currentSceneIndex: nextIndex }
    case 'WORKFLOW_NEXT':
      nextIndex = state.currentSceneIndex + 1
      if (nextIndex === state[state.currentKey].scenes) {
        nextIndex = state.currentSceneIndex
      }
      return { ...state, currentSceneIndex: nextIndex, showModal: false }
    case 'WORKFLOW_LAUNCH_MODAL':
      return { ...state, showModal: true }
    case 'WORKFLOW_CANCEL_MODAL':
      return { ...state, showModal: false, modalView: null }
    case 'ON_RECOVERY_LOGIN_IS_ENABLED':
      return {
        ...state,
        currentKey: Constants.WORKFLOW_RECOVERY_LOGIN,
        currentSceneIndex: 0
      }
    case 'SET_RECOVERY_KEY':
      return {
        ...state,
        currentKey: Constants.WORKFLOW_RECOVERY_LOGIN,
        currentSceneIndex: 0
      }
    case 'CANCEL_RECOVERY_KEY':
      return {
        ...state,
        currentKey: Constants.WORKFLOW_PASSWORD_FORCED,
        currentSceneIndex: 0
      }
    case 'RECOVERY_AFTER_OTP_CHECK':
      return {
        ...state,
        currentKey: Constants.WORKFLOW_RECOVERY_LOGIN,
        currentSceneIndex: 1
      }
    case 'RESET_APP':
      return initialState
    default:
      return state
  }
}
