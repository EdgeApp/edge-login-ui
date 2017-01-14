export const SHOW_OPERATOR_ADD_MODAL                = 'SHOW_OPERATOR_ADD_MODAL'
export const HIDE_OPERATOR_ADD_MODAL                = 'HIDE_OPERATOR_ADD_MODAL'
export const SHOW_OPERATOR_DELETE_MODAL             = 'SHOW_OPERATOR_DELETE_MODAL'
export const HIDE_OPERATOR_DELETE_MODAL             = 'HIDE_OPERATOR_DELETE_MODAL'
export const SHOW_OPERATOR_EDIT_USER_MODAL		    = 'SHOW_OPERATOR_EDIT_USER_MODAL'
export const HIDE_OPERATOR_EDIT_USER_MODAL    		= 'HIDE_OPERATOR_EDIT_USER_MODAL'
export const SHOW_OPERATOR_EDIT_ACCOUNT_MODAL       = 'SHOW_OPERATOR_EDIT_ACCOUNT_MODAL'
export const HIDE_OPERATOR_EDIT_ACCOUNT_MODAL       = 'HIDE_OPERATOR_EDIT_ACCOUNT_MODAL'


export function showOperatorAddModal() {
    return {
        type: SHOW_OPERATOR_ADD_MODAL
    }
}

export function hideOperatorAddModal() {
    return {
        type: HIDE_OPERATOR_ADD_MODAL
    }
}

export function showOperatorDeleteModal() {
    return {
        type: SHOW_OPERATOR_DELETE_MODAL
    }
}

export function hideOperatorDeleteModal() {
    return {
        type: HIDE_OPERATOR_DELETE_MODAL
    }
}

export function showOperatorEditUserModal() {
    return {
        type: SHOW_OPERATOR_EDIT_USER_MODAL
    }
}

export function hideOperatorEditUserModal() {
    return {
        type: HIDE_OPERATOR_EDIT_USER_MODAL
    }
}

export function showOperatorEditAccountModal() {
    return {
        type: SHOW_OPERATOR_EDIT_ACCOUNT_MODAL
    }
}

export function hideOperatorEditAccountModal() {
    return {
        type: HIDE_OPERATOR_EDIT_ACCOUNT_MODAL
    }
}
