export const SHOW_GAME_HISTORY_DETAIL_MODAL		= 'SHOW_GAME_HISTORY_DETAIL_MODAL'
export const HIDE_GAME_HISTORY_DETAIL_MODAL		= 'HIDE_GAME_HISTORY_DETAIL_MODAL'

export function showGameHistoryDetailModal() {
    return {
        type: SHOW_GAME_HISTORY_DETAIL_MODAL
    }
}

export function hideGameHistoryDetailModal() {
    return {
        type: HIDE_GAME_HISTORY_DETAIL_MODAL
    }
}
