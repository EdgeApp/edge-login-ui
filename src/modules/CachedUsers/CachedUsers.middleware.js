import { deleteUserFromUserCache } from './CachedUsers.action'

export const deleteUserToCache = username => {
  return (dispatch, getState, imports) => {
    const abcctx = imports.abcContext
    const localStorage = global ? global.localStorage : window.localStorage
    const lastUser = localStorage.getItem('lastUser')

    abcctx(ctx => ctx.removeUsername(username))
    if (lastUser === username) localStorage.removeItem('lastUser')
    dispatch(deleteUserFromUserCache(username))
  }
}
