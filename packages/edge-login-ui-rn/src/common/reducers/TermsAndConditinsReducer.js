import * as Constants from '../../common/constants'
import s from '../../common/locales/strings.js'
const titleOne = s.strings.terms_one
const titleTwo = s.strings.terms_two
const titleThree = s.strings.terms_three
const initialState = {
  items: [
    { title: titleOne, value: false },
    { title: titleTwo, value: false },
    { title: titleThree, value: false }
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
