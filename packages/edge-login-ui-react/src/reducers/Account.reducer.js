import { CHANGE_ACCOUNT_PAGE } from '../actions/Account.action'

export const accountPage = (state = 'home', action) => {
  switch (action.type) {
    case CHANGE_ACCOUNT_PAGE:
      return action.page
    default:
      return state
  }
}
