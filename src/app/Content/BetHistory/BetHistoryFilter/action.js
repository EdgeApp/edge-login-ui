export const USER_ID_FILTER			= 'USER_ID_FILTER'
export const USER_ID_FILTER_VALUE	= 'USER_ID_FILTER_VALUE'

export const filterUserId = (data) => {
    return {
        type: USER_ID_FILTER,
        data
    }
}

export const filterUserIdValue = (data) => {
    return {
        type: USER_ID_FILTER_VALUE,
        data
    }
}
