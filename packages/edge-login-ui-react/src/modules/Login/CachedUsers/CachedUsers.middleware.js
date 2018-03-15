import { deleteUserFromUserCache } from './CachedUsers.action'

export const deleteUserToCache = username => {
  return (dispatch, getState, imports) => {
    const localStorage = global ? global.localStorage : window.localStorage
    const lastUser = localStorage.getItem('lastUser')

    window.abcui.abcuiContext.removeUsername(username)
    if (lastUser === username) localStorage.removeItem('lastUser')
    dispatch(deleteUserFromUserCache(username))
  }
}
