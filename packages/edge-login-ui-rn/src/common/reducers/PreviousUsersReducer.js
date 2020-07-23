// schema {lastUser:{}, userList: [], usernameOnlyList:[]}
export default function(state = null, action) {
  switch (action.type) {
    case 'SET_PREVIOUS_USERS':
      return action.data

    default:
      return state
  }
}
