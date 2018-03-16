import {
  CLOSE_ACCOUNT_CACHE_DELETE_MODAL,
  OPEN_ACCOUNT_CACHE_DELETE_MODAL
} from './AccountCacheDelete.action.js'

export const accountCacheDelete = (state = false, action) => {
  switch (action.type) {
    case OPEN_ACCOUNT_CACHE_DELETE_MODAL:
      return true
    case CLOSE_ACCOUNT_CACHE_DELETE_MODAL:
      return false
    default:
      return state
  }
}
