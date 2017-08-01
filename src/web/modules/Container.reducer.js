import * as ACTION from './Container.action'

export const containerNotification = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_CONTAINER_NOTIFICATION:
      return true
    case ACTION.HIDE_CONTAINER_NOTIFICATION:
      return false
    default:
      return state
  }
}

export const containerNotificationValues = (state = false, action) => {
  switch (action.type) {
    case ACTION.SHOW_CONTAINER_NOTIFICATION:
      return {text: action.text, notificationType: action.notificationType}
    case ACTION.HIDE_CONTAINER_NOTIFICATION:
      return false
    default:
      return state
  }
}
