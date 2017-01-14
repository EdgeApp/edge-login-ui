import * as ACTION_LOADER from '../action/loaderAction'

export const tableLoader = (state = false, action) => {
    switch (action.type) {
        case ACTION_LOADER.GAME_HISTORY_TABLE_LOADER_ON :
            return true
        case ACTION_LOADER.GAME_HISTORY_TABLE_LOADER_OFF :
            return false
        default :
            return state
    }
}
