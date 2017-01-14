import * as ACTION from '../action/modalAction'

export const operatorAddModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_OPERATOR_ADD_MODAL :
            return true
        case ACTION.HIDE_OPERATOR_ADD_MODAL :
            return false
        default :
            return state
    }
}

export const operatorDeleteModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_OPERATOR_DELETE_MODAL :
            return true
        case ACTION.HIDE_OPERATOR_DELETE_MODAL :
            return false
        default :
            return state
    }
}

export const operatorEditUserModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_OPERATOR_EDIT_USER_MODAL :
            return true
        case ACTION.HIDE_OPERATOR_EDIT_USER_MODAL :
            return false
        default :
            return state
    }
}

export const operatorEditAccountModal = (state = false, action) => {
    switch (action.type) {
        case ACTION.SHOW_OPERATOR_EDIT_ACCOUNT_MODAL :
            return true
        case ACTION.HIDE_OPERATOR_EDIT_ACCOUNT_MODAL :
            return false
        default :
            return state
    }
}
