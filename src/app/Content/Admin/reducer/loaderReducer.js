import * as ACTION_LOADER from '../action/loaderAction'
import * as ACTION from '../action/action'

export const tableLoader = (state = false, action) => {
    switch (action.type) {
        case ACTION_LOADER.ADMIN_TABLE_LOADER_ON :
            return true
        case ACTION_LOADER.ADMIN_TABLE_LOADER_OFF :
            return false
        default :
            return state
    }
}

export const addFormLoader = (state = false, action) => {
    switch (action.type) {
        case ACTION_LOADER.ADMIN_ADD_FORM_LOADER_ON :
            return true
        case ACTION_LOADER.ADMIN_ADD_FORM_LOADER_OFF :
            return false
        default :
            return state
    }
}


export const editAccountFormLoader = (state = false, action) => {
    switch (action.type) {
        case ACTION_LOADER.ADMIN_EDIT_ACCOUNT_FORM_LOADER_ON :
            return true
        case ACTION_LOADER.ADMIN_EDIT_ACCOUNT_FORM_LOADER_OFF :
            return false
        default :
            return state
    }
}

export const editUserFormLoader = (state = false, action) => {
    switch (action.type) {
        case ACTION_LOADER.ADMIN_EDIT_USER_FORM_LOADER_ON :
            return true
        case ACTION_LOADER.ADMIN_EDIT_USER_FORM_LOADER_OFF :
            return false
        default :
            return state
    }
}

export const deleteFormLoader = (state = false, action) => {
    switch (action.type) {
        case ACTION_LOADER.ADMIN_DELETE_FORM_LOADER_ON :
            return true
        case ACTION_LOADER.ADMIN_DELETE_FORM_LOADER_OFF :
            return false
        default :
            return state
    }
}
