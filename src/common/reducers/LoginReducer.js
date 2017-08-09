import * as Constants from '../../common/constants'

const initialState = {
  username: null,
  password: null,
  pin: null,
  usernameErrorMessage: null,
  passwordErrorMessage: null,
  createErrorMessage: null,
  loginPasswordErrorMessage: null,
  loginPinErrorMessage: null,
  loginSuccess: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.LOGIN_USERNAME_PASSWORD:
      console.log('HEY NOW YOUR AN ALL STAR ')
      console.log(action.data)
      console.log(action)
      return {...state, loginSuccess: true}
    case Constants.AUTH_UPDATE_USERNAME:
      return {...state, username: action.data}
    default:
      console.log('returning default state ')
      console.log(state)
      return state
  }
}
