import * as Constants from '../../common/constants'

const initialState = {
  currentSceneIndex: 0,
  currentKey: 'firstLoadWF',
  showModal: false,
  modalView: null,
  firstLoadWF: {
    scenes: 1,
    details: [{ back: false, skip: false, title: 'firstLoad', subTitle: '' }]
  },
  initalizeWF: {
    scenes: 1,
    details: [{ back: false, skip: false, title: 'initialize', subTitle: '' }]
  },
  createWF: {
    scenes: 7,
    details: [
      { back: false, skip: false, title: '', subTitle: '' },
      {
        back: true,
        skip: false,
        title: 'Choose a username',
        subTitle: 'step 1/3'
      },
      {
        back: true,
        skip: false,
        title: 'Set a password',
        subTitle: 'step 2/3'
      },
      {
        back: true,
        skip: false,
        title: 'Set a 4-digit PIN ',
        subTitle: 'step 3/3'
      },
      {
        back: false,
        skip: false,
        title: 'Creating your account',
        subTitle: ''
      },
      {
        back: false,
        skip: false,
        title: 'Write it down',
        subTitle: 'ACCOUNT CONFIRMATION'
      },
      {
        back: true,
        skip: false,
        title: 'Quick Review',
        subTitle: 'ACCOUNT CONFIRMATION'
      }
    ]
  },
  passwordWF: {
    scenes: 1,
    details: [
      { back: true, skip: false, title: 'Change Password', subTitle: '' }
    ]
  },
  pinWF: {
    scenes: 1,
    details: [{ back: true, skip: false, title: 'Change Pin', subTitle: '' }]
  },
  recoveryWF: {
    scenes: 1,
    details: [{ back: true, skip: false, title: 'Recovery', subTitle: '' }]
  },
  fingerprintWF: {
    scenes: 1,
    details: [{ back: false, skip: false, title: 'title', subTitle: '' }]
  },
  otpWF: {
    scenes: 1,
    details: [
      {
        back: true,
        skip: false,
        title: 'Two Factor Authentication',
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
        title: 'Recovery Questions',
        subTitle: 'step 1/3'
      },
      {
        back: true,
        skip: false,
        title: 'Change Password',
        subTitle: 'step 2/3'
      },
      {
        back: true,
        skip: false,
        title: 'Change PIN',
        subTitle: 'step 3/3'
      }
    ]
  }
}
export default function (state = initialState, action) {
  let nextIndex
  switch (action.type) {
    case Constants.SET_PREVIOUS_USERS:
      return { ...state, showModal: false, modalView: null }
    case Constants.OTP_ERROR:
      return {
        ...state,
        currentKey: Constants.WORKFLOW_OTP,
        currentSceneIndex: 0
      }
    case Constants.WORKFLOW_START:
      return { ...state, currentKey: action.data, currentSceneIndex: 0 }
    case Constants.WORKFLOW_BACK:
      nextIndex = state.currentSceneIndex - 1
      if (nextIndex === -1) {
        nextIndex = 0
      }
      return { ...state, currentSceneIndex: nextIndex }
    case Constants.WORKFLOW_NEXT:
      nextIndex = state.currentSceneIndex + 1
      if (nextIndex === state[state.currentKey].scenes) {
        nextIndex = state.currentSceneIndex
      }
      return { ...state, currentSceneIndex: nextIndex, showModal: false }
    case Constants.WORKFLOW_LAUNCH_MODAL:
      return { ...state, showModal: true }
    case Constants.WORKFLOW_CANCEL_MODAL:
      return { ...state, showModal: false, modalView: null }
    case Constants.ON_RECOVERY_LOGIN_IS_ENABLED:
      return {
        ...state,
        currentKey: Constants.WORKFLOW_RECOVERY_LOGIN,
        currentSceneIndex: 0
      }
    case Constants.SET_RECOVERY_KEY:
      return {
        ...state,
        currentKey: Constants.WORKFLOW_RECOVERY_LOGIN,
        currentSceneIndex: 0
      }
    case Constants.CANCEL_RECOVERY_KEY:
      return {
        ...state,
        currentKey: Constants.WORKFLOW_PASSWORD_FORCED,
        currentSceneIndex: 0
      }
    case Constants.RESET_APP:
      return initialState
    default:
      return state
  }
}
