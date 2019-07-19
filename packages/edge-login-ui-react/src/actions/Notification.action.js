export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

export function openNotification (message, theme = 'danger') {
  return {
    type: OPEN_NOTIFICATION,
    message,
    theme
  }
}

export function closeNotification () {
  return {
    type: CLOSE_NOTIFICATION
  }
}
