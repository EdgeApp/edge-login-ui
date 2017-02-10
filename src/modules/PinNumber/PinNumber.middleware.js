import { openErrorModal } from '../ErrorModal/ErrorModal.action'

export const checkPIN = (pin, callback) => {
  return (dispatch, getState, imports) => {
    if (pin.length === 4) {
      return callback()
    } else {
      return dispatch(
        openErrorModal(
          imports.t('activity_signup_insufficient_pin')
        )
      )
    }
  }
}
