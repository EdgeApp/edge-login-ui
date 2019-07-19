import t from '../lib/LocaleStrings'

export const checkPIN = (pin, callback) => {
  return () => {
    if (pin.length !== 4) {
      return callback(t('error_pin_length'))
    }
    if (pin.length === 4) {
      return callback()
    }
  }
}
