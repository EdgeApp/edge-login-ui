export const OPEN_SUCCESS_MODAL = 'OPEN_SUCCESS_MODAL'
export const CLOSE_SUCCESS_MODAL = 'CLOSE_SUCCESS_MODAL'

export function openSuccessModal () {
  return {
    type: OPEN_SUCCESS_MODAL
  }
}

export function closeSuccessModal () {
  return {
    type: CLOSE_SUCCESS_MODAL
  }
}
