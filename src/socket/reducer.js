import * as ACTION from './action'

export const appinfo = (state = {}, action ) => {
    switch(action.type) {
        case ACTION.SOCKET_APP_INFO :
            return action.data
        default :
            return state
    }
}
