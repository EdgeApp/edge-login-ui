// @flow

import type { DiskletFolder } from 'disklet'
import type { EdgeContext } from 'edge-core-js'

import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'
import * as Constants from '../constants'
import { dispatchActionWithData } from './'

async function getDiskStuff (context: EdgeContext, folder: DiskletFolder) {
  const userList = await context.listUsernames().then(usernames =>
    Promise.all(
      usernames.map(username => {
        return context
          .pinLoginEnabled(username)
          .then(pinEnabled => ({ username, pinEnabled }))
      })
    )
  )

  const lastUser = await folder
    .file('lastuser.json')
    .getText() // setText for later. username
    .then(text => JSON.parse(text))
    .then(json => json.username)
    .catch(e => userList[0])

  return { lastUser, userList }
}

export function getPreviousUsers () {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { context, folder, username } = imports
    getDiskStuff(context, folder).then((data: Object) => {
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
