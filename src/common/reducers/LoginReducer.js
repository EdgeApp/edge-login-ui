import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  pin: null,
  errorMessage: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.LOGIN_USERNAME_PASSWORD:
      console.log('HEY NOW YOUR AN ALL STAR ')
      console.log(action.data)
      console.log(action)
      return state

    default:
      return state
  }
}
