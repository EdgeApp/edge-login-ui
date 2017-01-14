export const GAME_HISTORY_TABLE_LOADER_ON 				= 'GAME_HISTORY_TABLE_LOADER_ON'
export const GAME_HISTORY_TABLE_LOADER_OFF 				= 'GAME_HISTORY_TABLE_LOADER_OFF'

export const tableLoaderOn = () => {
    return {
        type: GAME_HISTORY_TABLE_LOADER_ON
    }
}

export const tableLoaderOff = () => {
    return {
        type: GAME_HISTORY_TABLE_LOADER_OFF
    }
}
