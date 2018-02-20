import * as Constants from '../../common/constants'

// schema {lastUser:{}, userList: [], usersWithPinList:[], usernameOnlyList:[], filteredUsernameList:[], charactersFiltered}
export default function (state = null, action) {
  switch (action.type) {
    case Constants.AUTH_UPDATE_USERNAME:
      if (action.data === '' || action.data.length === 0) {
        if (!state) {
          return state
        }
        return { ...state, filteredUsernameList: state.usernameOnlyList }
      }
      // get the length of the string
      const username = action.data
      const num = username.length - 1
      const char = username.charAt(num)
      const arrayToBeFiltered =
        num > state.charactersFiltered
          ? state.filteredUsernameList
          : state.usernameOnlyList
      const tempArray = []
      if (state.arrayToBeFiltered) {
        for (let i = 0; i < arrayToBeFiltered.length; i++) {
          const item = arrayToBeFiltered[i]
          if (item.charAt(num) === char.toLowerCase()) {
            tempArray.push(item)
          }
        }
      }

      // get the character at
      return {
        ...state,
        filteredUsernameList: tempArray,
        charactersFiltered: num
      }

    case Constants.SET_PREVIOUS_USERS:
      return action.data

    default:
      return state
  }
}
