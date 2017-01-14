export const LIST_GAMES			= 'LIST_GAMES'
export const SELECT_GAME      	= 'SELECT_GAME'

export const listGames = (data) => {
    return {
        type: LIST_GAMES,
        data
    }
}

export const selectGames = (id) => {
    return {
        type: SELECT_GAME,
        id
    }
}
