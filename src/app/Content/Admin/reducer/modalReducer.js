import * as ACTION from '../action/modalAction'

export const adminAddModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_ADMIN_ADD_MODAL :
            return true
        case ACTION.HIDE_ADMIN_ADD_MODAL :
            return false
        default :
            return state
    }
}

export const adminDeleteModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_ADMIN_DELETE_MODAL :
            return true
        case ACTION.HIDE_ADMIN_DELETE_MODAL :
            return false
        default :
            return state
    }
}

export const adminEditUserModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_ADMIN_EDIT_USER_MODAL :
            return true
        case ACTION.HIDE_ADMIN_EDIT_USER_MODAL :
            return false
        default :
            return state
    }
}

export const adminEditAccountModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_ADMIN_EDIT_ACCOUNT_MODAL :
            return true
        case ACTION.HIDE_ADMIN_EDIT_ACCOUNT_MODAL :
            return false
        default :
            return state
    }
}
