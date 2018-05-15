// @flow
import * as Constants from '../constants/'
import s from '../locales/strings.js'

function translateError (arg: string) {
  switch (arg) {
    case Constants.UNEXPECTED_END_OF_DATA:
      return s.strings.unexpected_end_of_data
    default:
      return arg
  }
}

export { translateError }
