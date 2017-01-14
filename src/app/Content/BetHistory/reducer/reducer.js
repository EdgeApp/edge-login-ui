import * as ACTION from '../action/action'
import { HIDE_BET_HISTORY_DETAIL_MODAL } from '../action/modalAction'

export const bets = (state = [], action) => {

    switch (action.type) {
        case ACTION.LIST_BETS :
			return [ ...action.data ]
        default:
            return state
    }
}

export const selected = (state = null, action) => {

    switch (action.type) {
        case ACTION.SELECT_BET :
            return action.id
		case HIDE_BET_HISTORY_DETAIL_MODAL :
			return null
        default :
            return state
    }

}
