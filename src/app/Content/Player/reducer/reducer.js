import * as ACTION from '../action/action'
import { SOCKET_PLAYER_LIST } from '../../../../socket/action'

export const players = (state = [], action) => {

    switch (action.type) {

        case ACTION.LIST_PLAYERS :
			return [ ...action.data ]

        case ACTION.EDIT_PLAYER :
            return state.map(player => player._id === action.data._id ? action.data : player)

        default:
            return state
    }
}

export const online = (state = {}, action) => {

    switch (action.type) {

        case ACTION.LIST_PLAYERS_ONLINE :
			return action.data

        case SOCKET_PLAYER_LIST :
			return action.data

        default:
            return state
    }
}

export const selected = (state = null, action) => {

    switch (action.type) {
        case ACTION.SELECT_PLAYER :
            return action.id
        default :
            return state
    }

}
