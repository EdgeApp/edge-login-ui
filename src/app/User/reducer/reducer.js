import { USER_LOGGED_IN, USER_LOGGED_OUT } from './../action/action'

export const user = (state = null  , action ) => {
    switch(action.type) {
        case USER_LOGGED_IN :
            return action.data

        case USER_LOGGED_OUT :
            return null

        default :
            return state
    }
}
