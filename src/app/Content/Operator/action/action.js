export const LIST_OPERATORS                     = 'LIST_OPERATORS'
export const SELECT_OPERATOR                    = 'SELECT_OPERATOR'
export const ADD_OPERATOR                       = 'ADD_OPERATOR'
export const DELETE_OPERATOR                    = 'DELETE_OPERATOR'
export const EDIT_OPERATOR_USER 	            = 'EDIT_OPERATOR_USER'
export const EDIT_OPERATOR_ACCOUNT              = 'EDIT_OPERATOR_ACCOUNT'
export const UPLOAD_OPERATOR_PICTURE            = 'UPLOAD_OPERATOR_PICTURE'


export function listOperators(data) {
    return {
        type: LIST_OPERATORS,
        data
    }
}

export function selectOperator(id) {
    return {
        type: SELECT_OPERATOR,
        id
    }
}

export const addOperator = (data) => {
    return {
        type: ADD_OPERATOR,
        data
    }
}

export const deleteOperator = (data) => {
    return {
        type: DELETE_OPERATOR,
        data
    }
}

export const editOperatorUser = (data) => {
    return {
        type: EDIT_OPERATOR_USER,
        data
    }
}

export const editOperatorAccount = (data) => {
    return {
        type: EDIT_OPERATOR_ACCOUNT,
        data
    }
}

export const uploadPicture = (data) => {
    return {
        type: UPLOAD_OPERATOR_PICTURE,
        data
    }
}
