export const ERROR_MODAL_OPEN = 'ERROR_MODAL_OPEN'
export const ERROR_MODAL_CLOSE = 'ERROR_MODAL_CLOSE'

export function openErrorModal (error) {
  return {
    type: ERROR_MODAL_OPEN,
    error
  }
}

export function closeErrorModal () {
  return {
    type: ERROR_MODAL_CLOSE
  }
}
