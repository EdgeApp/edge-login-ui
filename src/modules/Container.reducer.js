import * as ACTION from './Container.action'

export const containerNotification = (state = false, action) => {
  console.log('inside Container.reducer.js->containerNotification')
  switch (action.type) {
    case ACTION.SHOW_CONTAINER_NOTIFICATION:
      return true
    case ACTION.HIDE_CONTAINER_NOTIFICATION:
      return false
    default:
      return state
  }
}