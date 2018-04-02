import * as Constants from '../../common/constants'
import s from '../../common/locales/strings.js'
const initialState = {
  currentSceneIndex: 0,
  currentKey: 'firstLoadWF',
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
