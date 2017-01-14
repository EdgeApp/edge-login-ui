import * as ACTION from '../action/action'
import { SOCKET_GAME_FINISHED } from '../../../../socket/action'
import { HIDE_GAME_HISTORY_DETAIL_MODAL } from '../action/modalAction'
export const games = (state = [], action) => {

    switch (action.type) {
        case ACTION.LIST_GAMES :
			return [ ...action.data ]
        case SOCKET_GAME_FINISHED :
			console.log(action.data)
			return [ action.data, ...state ]
        default:
            return state
    }
}

export const selected = (state = null, action) => {

    switch (action.type) {
        case ACTION.SELECT_GAME :
            return action.id
        case HIDE_GAME_HISTORY_DETAIL_MODAL :
            return null
        default :
            return state
    }

}
