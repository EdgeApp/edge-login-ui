// @flow

import type { DiskletFolder } from 'disklet'
import type { EdgeContext } from 'edge-core-js'

import { isTouchEnabled } from '../../native/keychain'
import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'
import * as Constants from '../constants'
import { dispatchActionWithData } from './'

function sortUserList(lastUsers: Array<string>, userList: Array<Object>) {
  const limitLastUsers = lastUsers.length > 0 ? lastUsers.slice(0, 3) : []
  const detailedLastUsers = limitLastUsers.map(lastUser => {
    return userList.find(user => user.username === lastUser)
  })
  const filteredUserList = userList.filter(
    user => !limitLastUsers.find(lastUser => user.username === lastUser)
  )
  const sortedUserList = filteredUserList.sort((a: Object, b: Object) => {
    const stringA = a.username.toUpperCase()
    const stringB = b.username.toUpperCase()
    if (stringA < stringB) {
      return -1
    }
    if (stringA > stringB) {
      return 1
    }
    return 0
  })

  return [...detailedLastUsers, ...sortedUserList]
}

async function getDiskStuff(context: EdgeContext, folder: DiskletFolder) {
  const userList = await context.listUsernames().then(usernames =>
    Promise.all(
      usernames.map(username => {
        return context.pinLoginEnabled(username).then(async pinEnabled => {
          return {
            username,
            pinEnabled,
            touchEnabled: await isTouchEnabled(folder, username)
          }
        })
      })
    )
  )
  const lastUsers = await folder
    .file('lastusers.json')
    .getText()
    .then(text => JSON.parse(text))
    .catch(e => e)
  const sortedUserList = sortUserList(lastUsers || [], userList)
  return {
    lastUser: lastUsers ? lastUsers[0] : [],
    userList: sortedUserList
  }
}

export function getPreviousUsers() {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { context, folder, username } = imports
    getDiskStuff(context, folder).then((data: Object) => {
      const focusUser = username || data.lastUser
      if (data.userList.length > 0) {
        data.usersWithPinList = []
        data.usernameOnlyList = []
        data.filteredUsernameList = []
        data.userList.forEach(function(element) {
          if (element.username === focusUser) {
            data.lastUser = {
              username: focusUser,
              pinEnabled: element.pinEnabled,
              touchEnabled: element.touchEnabled
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
