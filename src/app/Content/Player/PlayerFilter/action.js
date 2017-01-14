export const USERNAME_FILTER			= 'USERNAME_FILTER'
export const USERNAME_FILTER_VALUE		= 'USERNAME_FILTER_VALUE'
export const STATUS_FILTER      		= 'STATUS_FILTER'
export const DETAILS_FILTER		    	= 'DETAILS_FILTER'
export const PENALTY_FILTER_MUTE    	= 'PENALTY_FILTER_MUTE'
export const PENALTY_FILTER_IGNORE    	= 'PENALTY_FILTER_IGNORE'
export const PENALTY_FILTER_DISABLE    	= 'PENALTY_FILTER_DISABLE'
export const PENALTY_FILTER_BAN    		= 'PENALTY_FILTER_BAN'

export const filterUsername = (data) => {
    return {
        type: USERNAME_FILTER,
        data
    }
}

export const filterUsernameValue = (data) => {
    return {
        type: USERNAME_FILTER_VALUE,
        data
    }
}

export const filterStatus = (data) => {
    return {
        type: STATUS_FILTER,
        data
    }
}

export const filterDetails = (data) => {
    return {
        type: DETAILS_FILTER,
        data
    }
}

export const filterPenaltyMute = (data) => {
    return {
        type:  PENALTY_FILTER_MUTE,
		data
 	}
}

export const filterPenaltyIgnore = (data) => {
    return {
        type:  PENALTY_FILTER_IGNORE,
		data

 	}
}

export const filterPenaltyDisable = (data) => {
    return {
        type:  PENALTY_FILTER_DISABLE,
		data

 	}
}

export const filterPenaltyBan = (data) => {
    return {
        type:  PENALTY_FILTER_BAN,
		data

 	}
}

