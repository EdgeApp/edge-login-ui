import * as ACTION from '../action/modalAction'

export const gameHistoryDetailModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_GAME_HISTORY_DETAIL_MODAL :
            return true
        case ACTION.HIDE_GAME_HISTORY_DETAIL_MODAL :
            return false
        default :
            return state
    }
}
