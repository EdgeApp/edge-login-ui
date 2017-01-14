export const BET_HISTORY_TABLE_LOADER_ON 				= 'BET_HISTORY_TABLE_LOADER_ON'
export const BET_HISTORY_TABLE_LOADER_OFF 				= 'BET_HISTORY_TABLE_LOADER_OFF'

export const tableLoaderOn = () => {
    return {
        type: BET_HISTORY_TABLE_LOADER_ON
    }
}

export const tableLoaderOff = () => {
    return {
        type: BET_HISTORY_TABLE_LOADER_OFF
    }
}
