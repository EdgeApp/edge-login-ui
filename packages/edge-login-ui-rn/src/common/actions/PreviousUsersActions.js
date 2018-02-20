import * as Constants from '../constants'
import { dispatchActionWithData } from './'

async function getDiskStuff (context) {
  const userList = await context.listUsernames().then(usernames =>
    Promise.all(
      usernames.map(username => {
        return context
          .pinLoginEnabled(username)
          .then(pinEnabled => ({ username, pinEnabled }))
      })
    )
  )

  const lastUser = await context.io.folder
    .file('lastuser.json')
    .getText() // setText for later. username
    .then(text => JSON.parse(text))
    .then(json => json.username)
    .catch(e => userList[0])

  return { lastUser, userList }
}

export function getPreviousUsers (context) {
  return (dispatch, getState, imports) => {
    const context = imports.context
    const username = imports.username
    getDiskStuff(context).then(data => {
      const focusUser = username || data.lastUser
      if (data.lastUser) {
        data.usersWithPinList = []
        data.usernameOnlyList = []
        data.filteredUsernameList = []
        data.userList.forEach(function (element) {
          if (element.username === focusUser) {
            data.lastUser = {
              username: focusUser,
              pinEnabled: element.pinEnabled
            }
          }
          if (element.pinEnabled) {
            data.usersWithPinList.push(element.username)
          }
          data.usernameOnlyList.push(element.username)
          data.filteredUsernameList.push(element.username)
        }, this)
      }
      dispatch(dispatchActionWithData(Constants.SET_PREVIOUS_USERS, data))
    })
  }
}
