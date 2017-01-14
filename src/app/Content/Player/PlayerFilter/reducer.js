import * as ACTION from './action'

export const username = (state = '', action) => {
    switch (action.type) {
        case ACTION.USERNAME_FILTER :
			return action.data
        default:
            return state
    }
}

export const usernameValue = (state = '', action) => {
    switch (action.type) {
        case ACTION.USERNAME_FILTER_VALUE :
			return action.data
        default:
            return state
    }
}

export const status = (state = 'online', action) => {
    switch (action.type) {
        case ACTION.STATUS_FILTER :
			return action.data
        default:
            return state
    }
}

export const details = (state = 'default', action) => {
    switch (action.type) {
        case ACTION.DETAILS_FILTER :
			return action.data
        default:
            return state
    }
}

export const mute = (state = false, action) => {
    switch (action.type) {
        case ACTION.PENALTY_FILTER_MUTE :
			return action.data
        default:
            return state
    }
}

export const ignore = (state = false, action) => {
    switch (action.type) {
        case ACTION.PENALTY_FILTER_IGNORE :
			return action.data
        default:
            return state
    }
}

export const disable = (state = false, action) => {
    switch (action.type) {
        case ACTION.PENALTY_FILTER_DISABLE :
			return action.data
        default:
            return state
    }
}

export const ban = (state = false, action) => {
    switch (action.type) {
        case ACTION.PENALTY_FILTER_BAN :
			return action.data
        default:
            return state
    }
}
