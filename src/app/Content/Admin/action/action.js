export const LIST_ADMINS                     = 'LIST_ADMINS'
export const SELECT_ADMIN                    = 'SELECT_ADMIN'
export const ADD_ADMIN                       = 'ADD_ADMIN'
export const DELETE_ADMIN                    = 'DELETE_ADMIN'
export const EDIT_ADMIN_USER 	            = 'EDIT_ADMIN_USER'
export const EDIT_ADMIN_ACCOUNT              = 'EDIT_ADMIN_ACCOUNT'
export const UPLOAD_ADMIN_PICTURE            = 'UPLOAD_ADMIN_PICTURE'


export function listAdmins(data) {
    return {
        type: LIST_ADMINS,
        data
    }
}

export function selectAdmin(id) {
    return {
        type: SELECT_ADMIN,
        id
    }
}

export const addAdmin = (data) => {
    return {
        type: ADD_ADMIN,
        data
    }
}

export const deleteAdmin = (data) => {
    return {
        type: DELETE_ADMIN,
        data
    }
}

export const editAdminUser = (data) => {
    return {
        type: EDIT_ADMIN_USER,
        data
    }
}

export const editAdminAccount = (data) => {
    return {
        type: EDIT_ADMIN_ACCOUNT,
        data
    }
}

export const uploadPicture = (data) => {
    return {
        type: UPLOAD_ADMIN_PICTURE,
        data
    }
}
