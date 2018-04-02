export const OPEN_ACCOUNT_CREATED_MODAL = 'OPEN_ACCOUNT_CREATED_MODAL'
export const CLOSE_ACCOUNT_CREATED_MODAL = 'CLOSE_ACCOUNT_CREATED_MODAL'

export function openAccountCreatedModal () {
  return {
    type: OPEN_ACCOUNT_CREATED_MODAL
  }
}

export function closeAccountCreatedModal () {
  return {
    type: CLOSE_ACCOUNT_CREATED_MODAL
  }
}
