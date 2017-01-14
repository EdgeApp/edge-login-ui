export const LIST_BETS			= 'LIST_BETS'
export const SELECT_BET      	= 'SELECT_BET'

export const listBets = (data) => {
    return {
        type: LIST_BETS,
        data
    }
}

export const selectBets = (id) => {
    return {
        type: SELECT_BET,
        id
    }
}
