export const SHOW_CONTAINER_NOTIFICATION = 'SHOW_CONTAINER_NOTIFICATION'
export const HIDE_CONTAINER_NOTIFICATION = 'HIDE_CONTAINER_NOTIFICATION'

export function showContainerNotification (text, notificationType) {
  console.log('within Container.action.js->showLoginNotification')
  return {
    type: SHOW_CONTAINER_NOTIFICATION,
    text,
    notificationType
  }
}

export function hideContainerNotification () {
    console.log('within Container.action.js->hideLoginNotification')
  return {
    type: HIDE_CONTAINER_NOTIFICATION
  }
}