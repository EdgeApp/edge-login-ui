import * as Constants from '../../common/constants'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.ACCEPT_TERMS_CONDITIONS:
      return state
    default:
      return state
  }
}
