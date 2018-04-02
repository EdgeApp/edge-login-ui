const SHOW_QR_CODE = 'SHOW_QR_CODE'
const HIDE_QR_CODE = 'HIDE_QR_CODE'

export function showQRCode () {
  return {
    type: SHOW_QR_CODE
  }
}

export function hideQRCode () {
  return {
    type: HIDE_QR_CODE
  }
}

export const mobileShowQRCode = (state = false, action) => {
  switch (action.type) {
    case SHOW_QR_CODE:
      return true
    case HIDE_QR_CODE:
      return false
    default:
      return state
  }
}
