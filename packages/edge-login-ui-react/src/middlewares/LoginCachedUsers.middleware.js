import { deleteUserFromUserCache } from '../actions/LoginCachedUsers.action'
import { openNotification } from '../actions/Notification.action'
import { errorHandling, lastUser } from '../lib/helper'

export const deleteUserToCache = username => {
  return (dispatch, _, imports) => {
    const t = imports.t
    const localStorage = global ? global.localStorage : window.localStorage
    const lastUserStorage = localStorage.getItem(lastUser)

    window.abcui.abcuiContext
      .deleteLocalAccount(username)
      .then(() => {
        if (lastUserStorage === username) localStorage.removeItem(lastUser)
        dispatch(deleteUserFromUserCache(username))
      })
      .catch(error => {
        return dispatch(openNotification(t(errorHandling(error.name))))
      })
  }
}
