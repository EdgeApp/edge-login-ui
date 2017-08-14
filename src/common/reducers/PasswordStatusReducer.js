import * as Constants from '../../common/constants'

export default function (state = null, action) {
  switch (action.type) {
    case Constants.AUTH_UPDATE_PASSWORD:
      // action.data.passwordStatus
      const status = action.data.passwordStatus
      console.log(action.data.passwordStatus)
      var array = [
        { title: 'at least 12 characters', value: !status.tooShort },
        { title: 'at least 1 lower case charachter', value: !status.noLowerCase },
        { title: 'at least 1 upper case character', value: !status.noUpperCase },
        { title: 'at least one number', value: !status.noNumber }
      ]
      return {
        passed: status.passed,
        secondsToCrack: {
          title: 'Time to Crack',
          value: status.secondsToCrack
        },
        list: array
      }

    default:
      return state
  }
}
