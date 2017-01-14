import * as ERROR_ACTION from '../action/errorAction'
import { ADD_OPERATOR, SHOW_OPERATOR, EDIT_OPERATOR_USER, EDIT_OPERATOR_ACCOUNT } from '../action/action'

export const addOperatorError = (state = {}, action) => {
    switch (action.type) {
        case ERROR_ACTION.ADD_OPERATOR_VALIDATE :
            return action.data
        case ADD_OPERATOR :
            return {}
        default :
            return state
    }
}

export const editOperatorUserError = (state = {}, action) => {
    switch (action.type) {
        case ERROR_ACTION.EDIT_OPERATOR_USER_VALIDATE :
            return action.data
        case SHOW_OPERATOR :
            return {}
        case EDIT_OPERATOR_USER :
            return {}
        default :
            return state
    }
}

export const editOperatorAccountError = (state = {}, action) => {
    switch (action.type) {
        case ERROR_ACTION.EDIT_OPERATOR_ACCOUNT_VALIDATE :
            return action.data
        case SHOW_OPERATOR :
            return {}
        case EDIT_OPERATOR_ACCOUNT :
            return {}
        default :
            return state
    }
}
