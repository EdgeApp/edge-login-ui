import * as ACTION from '../action/action'

export const operators = (state = [], action) => {

    switch (action.type) {

        case ACTION.LIST_OPERATORS :
			return [ ...action.data ]

        case ACTION.ADD_OPERATOR :
			return [ ...state, action.data ]

        case ACTION.EDIT_OPERATOR_USER :
            return state.map(operator => operator._id === action.data._id ? action.data : operator)

        case ACTION.EDIT_OPERATOR_ACCOUNT :
            return state.map(operator => operator._id === action.data._id ? action.data : operator)

        case ACTION.DELETE_OPERATOR : 
            return state.filter(operator => operator._id !== action.data._id)

        default:
            return state
    }
}

export const selected = (state = null, action) => {

    switch (action.type) {
        case ACTION.SELECT_OPERATOR :
            return action.id
        case ACTION.DELETE_OPERATOR :
            return null
        default :
            return state
    }

}
