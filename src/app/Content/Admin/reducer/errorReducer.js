import * as ERROR_ACTION from '../action/errorAction'
import { ADD_ADMIN, SHOW_ADMIN, EDIT_ADMIN_USER, EDIT_ADMIN_ACCOUNT } from '../action/action'

export const addAdminError = (state = {}, action) => {
    switch (action.type) {
        case ERROR_ACTION.ADD_ADMIN_VALIDATE :
            return action.data
        case ADD_ADMIN :
            return {}
        default :
            return state
    }
}

export const editAdminUserError = (state = {}, action) => {
    switch (action.type) {
        case ERROR_ACTION.EDIT_ADMIN_USER_VALIDATE :
            return action.data
        case SHOW_ADMIN :
            return {}
        case EDIT_ADMIN_USER :
            return {}
        default :
            return state
    }
}

export const editAdminAccountError = (state = {}, action) => {
    switch (action.type) {
        case ERROR_ACTION.EDIT_ADMIN_ACCOUNT_VALIDATE :
            return action.data
        case SHOW_ADMIN :
            return {}
        case EDIT_ADMIN_ACCOUNT :
            return {}
        default :
            return state
    }
}
