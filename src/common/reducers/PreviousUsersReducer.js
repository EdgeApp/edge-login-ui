import * as Constants from '../../common/constants'

export default function (state = null, action) {
  switch (action.type) {
    case Constants.SET_PREVIOUS_USERS:
      const data = action.data
      if (data.lastUser) {
        data.userList.forEach(function (element) {
          console.log(element)
          if (element.username === data.lastUser) {
            data.lastUser = {username: data.lastUser, pinEnabled: element.pinEnabled}
          }
        }, this)
      }
      return data

    default:
      return state
  }
}
