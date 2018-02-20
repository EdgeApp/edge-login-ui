export const OPEN_ACCOUNT_CACHE_DELETE_MODAL = 'OPEN_ACCOUNT_CACHE_DELETE_MODAL'
export const CLOSE_ACCOUNT_CACHE_DELETE_MODAL =
  'CLOSE_ACCOUNT_CACHE_DELETE_MODAL'

export function openAccountCacheDeleteModal () {
  return {
    type: OPEN_ACCOUNT_CACHE_DELETE_MODAL
  }
}

export function closeAccountCacheDeleteModal () {
  return {
    type: CLOSE_ACCOUNT_CACHE_DELETE_MODAL
  }
}
