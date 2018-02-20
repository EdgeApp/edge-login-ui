class PasswordHelper {
  constructor (arg) {
    this.tooShort = arg.tooShort
    this.noLowerCase = arg.noLowerCase
    this.noUpperCase = arg.noUpperCase
    this.passed = arg.passed
  }
}

export { PasswordHelper }
