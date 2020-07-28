// @flow

import type { DiskletFolder } from 'disklet'
import { makeReactNativeDisklet } from 'disklet'
import type { EdgeContext } from 'edge-core-js'

import { isTouchEnabled } from '../native/keychain.js'
import { type LoginUserInfo } from '../reducers/PreviousUsersReducer.js'
import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'

function sortUserList(
  lastUsers: string[],
  userList: LoginUserInfo[]
): LoginUserInfo[] {
  if (!userList || userList.length === 0) {
    return []
  }
  const limitLastUsers = lastUsers.length > 0 ? lastUsers.slice(0, 3) : []
  const detailedLastUsers: LoginUserInfo[] = []
  for (const lastUser of limitLastUsers) {
    const info = userList.find(user => user.username === lastUser)
    if (info != null) detailedLastUsers.push(info)
  }
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

  const disklet = makeReactNativeDisklet()
  const lastUsers = await disklet
    .getText('lastusers.json')
    .then(text => JSON.parse(text))
    .catch(_ => [])
  if (lastUsers && lastUsers.length > 0) {
    return {
      lastUser: lastUsers[0],
      userList: sortUserList(lastUsers, userList)
    }
  }
  const lastUser = await disklet
    .getText('lastuser.json')
    .then(text => JSON.parse(text))
    .then(json => (json && json.username ? json.username : ''))
    .catch(_ => '')
  return {
    lastUser,
    userList: sortUserList([lastUser], userList)
  }
}

export function getPreviousUsers() {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { context, folder, username } = imports
    getDiskStuff(context, folder).then((data: Object) => {
      const focusUser = username || data.lastUser
      if (data.userList && data.userList.length > 0) {
        data.usernameOnlyList = []
        data.userList.forEach(function(element) {
          if (element.username === focusUser) {
            data.lastUser = {
              username: focusUser,
              pinEnabled: element.pinEnabled,
              touchEnabled: element.touchEnabled
            }
          }
          data.usernameOnlyList.push(element.username)
        }, this)
      }
      dispatch({ type: 'SET_PREVIOUS_USERS', data: data })
    })
  }
}
