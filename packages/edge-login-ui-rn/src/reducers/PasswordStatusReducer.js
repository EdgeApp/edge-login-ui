// @flow

import s from '../common/locales/strings.js'
import { type Action } from '../types/ReduxTypes.js'

export type PasswordStatusState = {
  +secondsToCrack: string,
  +passed: boolean,
  +list: Array<{ title: string, value: boolean }>
}

export function passwordStatus(
  state: PasswordStatusState | null = null,
  action: Action
): PasswordStatusState | null {
  switch (action.type) {
    case 'AUTH_UPDATE_PASSWORD': {
      const status = action.data.passwordStatus
      const array = [
        { title: s.strings.must_ten_characters, value: !status.tooShort },
        {
          title: s.strings.must_one_lowercase,
          value: !status.noLowerCase
        },
        {
          title: s.strings.must_one_uppercase,
          value: !status.noUpperCase
        },
        { title: s.strings.must_one_number, value: !status.noNumber }
      ]

      return {
        passed: status.passed,
        secondsToCrack: action.data.passwordCheckString,
        list: array
      }
    }

    default:
      return state
  }
}
