import * as ACTION from '../action/action'

export const admins = (state = [], action) => {

    switch (action.type) {

        case ACTION.LIST_ADMINS :
			return [ ...action.data ]

        case ACTION.ADD_ADMIN :
			return [ ...state, action.data ]

        case ACTION.EDIT_ADMIN_USER :
            return state.map(admin => admin._id === action.data._id ? action.data : admin)

        case ACTION.EDIT_ADMIN_ACCOUNT :
            return state.map(admin => admin._id === action.data._id ? action.data : admin)

        case ACTION.DELETE_ADMIN : 
            return state.filter(admin => admin._id !== action.data._id)

        default:
            return state
    }
}

export const selected = (state = null, action) => {

    switch (action.type) {
        case ACTION.SELECT_ADMIN :
            return action.id
        case ACTION.DELETE_ADMIN :
            return null
        default :
            return state
    }

}
