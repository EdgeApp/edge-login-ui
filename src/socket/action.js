export const SOCKET_GAME_INFO 		= 'SOCKET_GAME_INFO'
export const SOCKET_PLAYER_LIST 	= 'SOCKET_PLAYER_LIST'
export const SOCKET_GAME_FINISHED 	= 'SOCKET_GAME_FINISHED'

export const socketGameInfo = data => {
    return {
        type: SOCKET_GAME_INFO,
		data
 	}
}

export const socketPlayerList = data => {
    return {
        type: SOCKET_PLAYER_LIST,
		data
 	}
}

export const socketGameFinished = data => {
    return {
        type: SOCKET_GAME_FINISHED,
		data
 	}
}
