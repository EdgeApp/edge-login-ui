export const ADD_ADMIN_VALIDATE               = 'ADD_ADMIN_VALIDATE'
export const EDIT_ADMIN_USER_VALIDATE 		 = 'EDIT_ADMIN_USER_VALIDATE'
export const EDIT_ADMIN_ACCOUNT_VALIDATE      = 'EDIT_ADMIN_ACCOUNT_VALIDATE'

export function onAddAdminError(data) {
    return {
        type: ADD_ADMIN_VALIDATE,
        data
    }
}

export function onEditAdminUserError(data) {
    return {
        type: EDIT_ADMIN_USER_VALIDATE,
        data
    }
}

export function onEditAdminAccountError(data) {
    return {
        type: EDIT_ADMIN_ACCOUNT_VALIDATE,
        data
    }
}
