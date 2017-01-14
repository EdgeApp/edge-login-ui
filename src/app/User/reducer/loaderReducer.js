import * as ACTION_LOADER from '../action/loaderAction'
import * as ACTION from '../action/action'

export const loader = (state = false, action) => {
    switch (action.type) {
        case ACTION_LOADER.USER_LOG_IN_LOADER_ON :
            return true
        case ACTION_LOADER.USER_LOG_IN_LOADER_OFF :
            return false
        default :
            return state
    }
}
