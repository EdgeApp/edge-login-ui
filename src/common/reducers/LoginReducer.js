import * as Constants from '../../common/constants'

export default function (state = [], action) {
  switch (action.type) {
    case Constants.LOGIN_USERNAME_PASSWORD:
      console.log('HEY NOW YOUR AN ALL STAR ')
      console.log(action.data)
      console.log(action)
      return state

    case Constants.GET_PREVIOUS_USERS:
      console.log('FUCK YEAH ')
      console.log(action.context)
      return state
    default:
      return state
  }
}
