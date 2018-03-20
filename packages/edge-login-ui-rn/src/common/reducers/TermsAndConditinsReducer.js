import * as Constants from '../../common/constants'
import s from '../../common/locales/strings.js'

const initialState = {
  items: [
    { title: s.strings.terms_one, value: false },
    { title: s.strings.terms_two, value: false },
    { title: s.strings.terms_three, value: false }
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.ACCEPT_TERMS_CONDITIONS:
      return state
    default:
      return state
  }
}
