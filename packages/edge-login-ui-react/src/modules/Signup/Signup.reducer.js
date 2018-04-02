import * as ACTION from './Signup.action'

export const signupPage = (state = 'username', action) => {
  switch (action.type) {
    case ACTION.CHANGE_SIGNUP_PAGE:
      return action.data
    default:
      return state
  }
}
