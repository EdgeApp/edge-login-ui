import * as Constants from '../../common/constants'

// schema {lastUser:{}, userList: [], usersWithPinList:[]}
export default function (state = null, action) {
  switch (action.type) {
    case Constants.SET_PREVIOUS_USERS:
      return action.data

    default:
      return state
  }
}
