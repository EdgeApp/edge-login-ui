import * as Constants from '../../common/constants'

export default function (state = null, action) {
  switch (action.type) {
    case Constants.AUTH_UPDATE_PASSWORD:
      // action.data.passwordStatus
      const status = action.data.passwordStatus
      var array = [
        { title: 'at least 10 characters', value: !status.tooShort },
        {
          title: 'at least 1 lowercase letter',
          value: !status.noLowerCase
        },
        {
          title: 'at least 1 uppercase letter',
          value: !status.noUpperCase
        },
        { title: 'at least 1 number', value: !status.noNumber }
      ]
      const msg = status.secondsToCrack

      return {
        passed: status.passed,
        secondsToCrack: msg,
        list: array
      }

    default:
      return state
  }
}
