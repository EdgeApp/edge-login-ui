import * as Constants from '../../common/constants'

export default function (state = null, action) {
  switch (action.type) {
    case Constants.AUTH_UPDATE_PASSWORD:
      // action.data.passwordStatus
      const status = action.data.passwordStatus
      var array = [
        { title: 'at least 10 characters', value: !status.tooShort },
        {
          title: 'at least 1 lower case charachter',
          value: !status.noLowerCase
        },
        {
          title: 'at least 1 upper case character',
          value: !status.noUpperCase
        },
        { title: 'at least one number', value: !status.noNumber }
      ]
      let msg = 'Seconds to Crack is not in the develop branch '
      if (status.secondsToCrack) {
        msg = status.secondsToCrack
      }
      return {
        passed: status.passed,
        secondsToCrack: msg,
        list: array
      }

    default:
      return state
  }
}
