export const ADD_OPERATOR_VALIDATE               = 'ADD_OPERATOR_VALIDATE'
export const EDIT_OPERATOR_USER_VALIDATE 		 = 'EDIT_OPERATOR_USER_VALIDATE'
export const EDIT_OPERATOR_ACCOUNT_VALIDATE      = 'EDIT_OPERATOR_ACCOUNT_VALIDATE'

export function onAddOperatorError(data) {
    return {
        type: ADD_OPERATOR_VALIDATE,
        data
    }
}

export function onEditOperatorUserError(data) {
    return {
        type: EDIT_OPERATOR_USER_VALIDATE,
        data
    }
}

export function onEditOperatorAccountError(data) {
    return {
        type: EDIT_OPERATOR_ACCOUNT_VALIDATE,
        data
    }
}
