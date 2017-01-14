import * as ACTION from './action'

export const userId = (state = '', action) => {
    switch (action.type) {
        case ACTION.USER_ID_FILTER :
			return action.data
        default:
            return state
    }
}

export const userIdValue = (state = '', action) => {
    switch (action.type) {
        case ACTION.USER_ID_FILTER_VALUE :
			return action.data
        default:
            return state
    }
}
