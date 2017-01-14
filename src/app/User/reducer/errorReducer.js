import * as ACTION_ERROR from '../action/errorAction'
import * as ACTION from '../action/action'

export const error = (state = {}, action) => {
    switch (action.type) {
        case ACTION_ERROR.LOGIN_ERROR :
            return action.data
        case ACTION.USER_LOGGED_IN :
            return {}
        case ACTION.USER_LOGGED_OUT :
            return {}
        default :
            return state
    }
}