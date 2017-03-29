export const SHOW_CONTAINER_NOTIFICATION = 'SHOW_CONTAINER_NOTIFICATION'
export const HIDE_CONTAINER_NOTIFICATION = 'HIDE_CONTAINER_NOTIFICATION'

export function showContainerNotification (text, notificationType) {
  return {
    type: SHOW_CONTAINER_NOTIFICATION,
    text,
    notificationType
  }
}

export function hideContainerNotification () {
  return {
    type: HIDE_CONTAINER_NOTIFICATION
  }
}
