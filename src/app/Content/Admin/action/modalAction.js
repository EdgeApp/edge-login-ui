export const SHOW_ADMIN_ADD_MODAL                = 'SHOW_ADMIN_ADD_MODAL'
export const HIDE_ADMIN_ADD_MODAL                = 'HIDE_ADMIN_ADD_MODAL'
export const SHOW_ADMIN_DELETE_MODAL             = 'SHOW_ADMIN_DELETE_MODAL'
export const HIDE_ADMIN_DELETE_MODAL             = 'HIDE_ADMIN_DELETE_MODAL'
export const SHOW_ADMIN_EDIT_USER_MODAL		     = 'SHOW_ADMIN_EDIT_USER_MODAL'
export const HIDE_ADMIN_EDIT_USER_MODAL    		 = 'HIDE_ADMIN_EDIT_USER_MODAL'
export const SHOW_ADMIN_EDIT_ACCOUNT_MODAL       = 'SHOW_ADMIN_EDIT_ACCOUNT_MODAL'
export const HIDE_ADMIN_EDIT_ACCOUNT_MODAL       = 'HIDE_ADMIN_EDIT_ACCOUNT_MODAL'


export function showAdminAddModal() {
    return {
        type: SHOW_ADMIN_ADD_MODAL
    }
}

export function hideAdminAddModal() {
    return {
        type: HIDE_ADMIN_ADD_MODAL
    }
}

export function showAdminDeleteModal() {
    return {
        type: SHOW_ADMIN_DELETE_MODAL
    }
}

export function hideAdminDeleteModal() {
    return {
        type: HIDE_ADMIN_DELETE_MODAL
    }
}

export function showAdminEditUserModal() {
    return {
        type: SHOW_ADMIN_EDIT_USER_MODAL
    }
}

export function hideAdminEditUserModal() {
    return {
        type: HIDE_ADMIN_EDIT_USER_MODAL
    }
}

export function showAdminEditAccountModal() {
    return {
        type: SHOW_ADMIN_EDIT_ACCOUNT_MODAL
    }
}

export function hideAdminEditAccountModal() {
    return {
        type: HIDE_ADMIN_EDIT_ACCOUNT_MODAL
    }
}
