export const USER_LOG_IN_LOADER_ON = 'USER_LOG_IN_LOADER_ON'
export const USER_LOG_IN_LOADER_OFF = 'USER_LOG_IN_LOADER_OFF'

export const loaderOn = () => {
    return {
        type: USER_LOG_IN_LOADER_ON
    }
}

export const loaderOff = () => {
    return {
        type: USER_LOG_IN_LOADER_OFF
    }
}
