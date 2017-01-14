import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

export const logInUser = data => {
    return {
        type: USER_LOGGED_IN,
        data
    }
}

export const logOutUser = () => {
    return {
        type: USER_LOGGED_OUT
    }
}
