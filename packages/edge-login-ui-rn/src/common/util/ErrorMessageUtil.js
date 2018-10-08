// @flow
import s from '../locales/strings.js'

function translateError (arg: string) {
  switch (arg) {
    case s.strings.not_enough_characters_in_field:
      return s.strings.not_enough_characters_in_field
    default:
      return arg
  }
}

export { translateError }
