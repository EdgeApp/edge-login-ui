// @flow

class PasswordHelper {
  tooShort: boolean
  noLowerCase: boolean
  noUpperCase: boolean
  passed: boolean
  constructor (arg: Object) {
    this.tooShort = arg.tooShort
    this.noLowerCase = arg.noLowerCase
    this.noUpperCase = arg.noUpperCase
    this.passed = arg.passed
  }
}

export { PasswordHelper }
