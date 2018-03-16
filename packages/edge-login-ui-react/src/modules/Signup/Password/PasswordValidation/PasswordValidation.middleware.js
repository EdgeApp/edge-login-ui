import * as action from './PasswordValidation.action'

export const validate = password => {
  return (dispatch, getState, imports) => {
    const abcContext = imports.abcContext

    abcContext(context => {
      const check = context.checkPasswordRules(password)
      dispatch(action.changeTimeToCrackPassword(check.secondsToCrack))

      if (!check.noLowerCase) {
        dispatch(action.lowerCaseCharPass())
      } else {
        dispatch(action.lowerCaseCharFail())
      }

      if (!check.noNumber) {
        dispatch(action.numberPass())
      } else {
        dispatch(action.numberFail())
      }

      if (!check.noUpperCase) {
        dispatch(action.upperCaseCharPass())
      } else {
        dispatch(action.upperCaseCharFail())
      }

      if (!check.tooShort) {
        dispatch(action.characterLengthPass())
      } else {
        dispatch(action.characterLengthFail())
      }

      if (check.passed) {
        dispatch(action.validatePassword())
      } else {
        dispatch(action.invalidatePassword())
      }
    })
  }
}
