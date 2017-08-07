import * as Constants from '../../common/constants'

const initialState = {
  currentSceneIndex: 0,
  currentKey: 'firstLoadWF',
  firstLoadWF: [],
  initalizeWF: [],
  createWF: 5,
  passwordWF: [],
  pinWF: [],
  recoveryWF: [],
  fingerprintWF: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.WORKFLOW_START:
      return { ...state, currentKey: action.data, currentSceneIndex: 0 }
    case Constants.WORKFLOW_NEXT:
      let nextIndex = state.currentSceneIndex + 1
      if (nextIndex === state[state.currentKey]) {
        nextIndex = state.currentSceneIndex
      }
      return { ...state, currentSceneIndex: nextIndex }

    default:
      return state
  }
}
