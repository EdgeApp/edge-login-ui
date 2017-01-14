export const SHOW_BET_HISTORY_DETAIL_MODAL		= 'SHOW_BET_HISTORY_DETAIL_MODAL'
export const HIDE_BET_HISTORY_DETAIL_MODAL		= 'HIDE_BET_HISTORY_DETAIL_MODAL'

export function showBetHistoryDetailModal() {
    return {
        type: SHOW_BET_HISTORY_DETAIL_MODAL
    }
}

export function hideBetHistoryDetailModal() {
    return {
        type: HIDE_BET_HISTORY_DETAIL_MODAL
    }
}
