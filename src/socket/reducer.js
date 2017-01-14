import * as ACTION from './action'

export const gameinfo = (state = {}, action ) => {
    switch(action.type) {
        case ACTION.SOCKET_GAME_INFO :
            return action.data
        default :
            return state
    }
}
