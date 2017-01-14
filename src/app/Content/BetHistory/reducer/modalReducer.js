import * as ACTION from '../action/modalAction'

export const betHistoryDetailModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_BET_HISTORY_DETAIL_MODAL :
            return true
        case ACTION.HIDE_BET_HISTORY_DETAIL_MODAL :
            return false
        default :
            return state
    }
}
