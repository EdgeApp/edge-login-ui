export const ADMIN_TABLE_LOADER_ON 				= 'ADMIN_TABLE_LOADER_ON'
export const ADMIN_TABLE_LOADER_OFF 				= 'ADMIN_TABLE_LOADER_OFF'
export const ADMIN_ADD_FORM_LOADER_ON 			= 'ADMIN_ADD_FORM_LOADER_ON'
export const ADMIN_ADD_FORM_LOADER_OFF 			= 'ADMIN_ADD_FORM_LOADER_OFF'
export const ADMIN_EDIT_ACCOUNT_FORM_LOADER_ON 	= 'ADMIN_EDIT_ACCOUNT_FORM_LOADER_ON'
export const ADMIN_EDIT_ACCOUNT_FORM_LOADER_OFF 	= 'ADMIN_EDIT_ACCOUNT_FORM_LOADER_OFF'
export const ADMIN_EDIT_USER_FORM_LOADER_ON 		= 'ADMIN_EDIT_USER_FORM_LOADER_ON'
export const ADMIN_EDIT_USER_FORM_LOADER_OFF		= 'ADMIN_EDIT_USER_FORM_LOADER_OFF'
export const ADMIN_DELETE_FORM_LOADER_ON 		= 'ADMIN_DELETE_FORM_LOADER_ON'
export const ADMIN_DELETE_FORM_LOADER_OFF 		= 'ADMIN_DELETE_FORM_LOADER_OFF'

export const tableLoaderOn = () => {
    return {
        type: ADMIN_TABLE_LOADER_ON
    }
}

export const tableLoaderOff = () => {
    return {
        type: ADMIN_TABLE_LOADER_OFF
    }
}

export const addFormLoaderOn = () => {
    return {
        type: ADMIN_ADD_FORM_LOADER_ON
    }
}

export const addFormLoaderOff = () => {
    return {
        type: ADMIN_ADD_FORM_LOADER_OFF
    }
}

export const editAccountFormLoaderOn = () => {
    return {
        type: ADMIN_EDIT_ACCOUNT_FORM_LOADER_ON
    }
}

export const editAccountFormLoaderOff = () => {
    return {
        type: ADMIN_EDIT_ACCOUNT_FORM_LOADER_OFF
    }
}

export const editUserFormLoaderOn = () => {
    return {
        type: ADMIN_EDIT_USER_FORM_LOADER_ON
    }
}

export const editUserFormLoaderOff = () => {
    return {
        type: ADMIN_EDIT_USER_FORM_LOADER_OFF
    }
}

export const deleteFormLoaderOn = () => {
    return {
        type: ADMIN_DELETE_FORM_LOADER_ON
    }
}

export const deleteFormLoaderOff = () => {
    return {
        type: ADMIN_DELETE_FORM_LOADER_OFF
    }
}
