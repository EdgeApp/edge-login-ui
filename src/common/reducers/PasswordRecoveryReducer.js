import * as Constants from '../../common/constants'

const initialState = {
  questionsList: [],
  isEnabled: false

}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.PASSWORD_RECOVERY_INITIALIZED:
      return {...state, questionsList: action.data.questionsList}
    default:
      return state
  }
}
