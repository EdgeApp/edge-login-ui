export const checkPIN = (pin, callback) => {
  return (dispatch, getState, imports) => {
    if (pin.length !== 4) {
      return callback(imports.t('activity_signup_insufficient_pin'))
    }
    if (pin.length === 4) {
      return callback()
    }
  }
}
