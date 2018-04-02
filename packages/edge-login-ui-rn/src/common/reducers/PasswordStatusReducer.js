import * as Constants from '../../common/constants'
import s from '../../common/locales/strings'
export default function (state = null, action) {
  switch (action.type) {
    case Constants.AUTH_UPDATE_PASSWORD:
      // action.data.passwordStatus
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

    default:
      return state
  }
}
