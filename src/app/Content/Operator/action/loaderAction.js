export const OPERATOR_TABLE_LOADER_ON 				= 'OPERATOR_TABLE_LOADER_ON'
export const OPERATOR_TABLE_LOADER_OFF 				= 'OPERATOR_TABLE_LOADER_OFF'
export const OPERATOR_ADD_FORM_LOADER_ON 			= 'OPERATOR_ADD_FORM_LOADER_ON'
export const OPERATOR_ADD_FORM_LOADER_OFF 			= 'OPERATOR_ADD_FORM_LOADER_OFF'
export const OPERATOR_EDIT_ACCOUNT_FORM_LOADER_ON 	= 'OPERATOR_EDIT_ACCOUNT_FORM_LOADER_ON'
export const OPERATOR_EDIT_ACCOUNT_FORM_LOADER_OFF 	= 'OPERATOR_EDIT_ACCOUNT_FORM_LOADER_OFF'
export const OPERATOR_EDIT_USER_FORM_LOADER_ON 		= 'OPERATOR_EDIT_USER_FORM_LOADER_ON'
export const OPERATOR_EDIT_USER_FORM_LOADER_OFF		= 'OPERATOR_EDIT_USER_FORM_LOADER_OFF'
export const OPERATOR_DELETE_FORM_LOADER_ON 		= 'OPERATOR_DELETE_FORM_LOADER_ON'
export const OPERATOR_DELETE_FORM_LOADER_OFF 		= 'OPERATOR_DELETE_FORM_LOADER_OFF'

export const tableLoaderOn = () => {
    return {
        type: OPERATOR_TABLE_LOADER_ON
    }
}

export const tableLoaderOff = () => {
    return {
        type: OPERATOR_TABLE_LOADER_OFF
    }
}

export const addFormLoaderOn = () => {
    return {
        type: OPERATOR_ADD_FORM_LOADER_ON
    }
}

export const addFormLoaderOff = () => {
    return {
        type: OPERATOR_ADD_FORM_LOADER_OFF
    }
}

export const editAccountFormLoaderOn = () => {
    return {
        type: OPERATOR_EDIT_ACCOUNT_FORM_LOADER_ON
    }
}

export const editAccountFormLoaderOff = () => {
    return {
        type: OPERATOR_EDIT_ACCOUNT_FORM_LOADER_OFF
    }
}

export const editUserFormLoaderOn = () => {
    return {
        type: OPERATOR_EDIT_USER_FORM_LOADER_ON
    }
}

export const editUserFormLoaderOff = () => {
    return {
        type: OPERATOR_EDIT_USER_FORM_LOADER_OFF
    }
}

export const deleteFormLoaderOn = () => {
    return {
        type: OPERATOR_DELETE_FORM_LOADER_ON
    }
}

export const deleteFormLoaderOff = () => {
    return {
        type: OPERATOR_DELETE_FORM_LOADER_OFF
    }
}
