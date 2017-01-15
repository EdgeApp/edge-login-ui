export const SOCKET_HISTORY 		= 'SOCKET_HISTORY'
export const SOCKET_APP_INFO = 'SOCKET_APP_INFO'
export const socketAppInfo = data => {
    return {
        type: SOCKET_APP_INFO,
    data
  }
}
export const socketHistory = data => {
    return {
        type: SOCKET_HISTORY,
		data
 	}
}
