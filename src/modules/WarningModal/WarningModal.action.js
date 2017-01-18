export const WARNING_MODAL_OPEN = 'WARNING_MODAL_OPEN'
export const WARNING_MODAL_CLOSE = 'WARNING_MODAL_CLOSE'


export function openWarningModal (module, title = '', message) {
  return {
    type: WARNING_MODAL_OPEN,
    module,
    title,
    message
  }
}

export function closeWarningModal () {
  return {
    type: WARNING_MODAL_CLOSE
  }
}
