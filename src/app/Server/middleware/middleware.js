import async from 'async'

import * as ajax from './ajax'
import * as action from '../action'
import { logout } from '../../User/middleware/middleware'

export const pause = () => {

    return dispatch => {
		ajax.pause( (status, response) => {
            if(status === 401) dispatch(handleUnauthorized())
            dispatch(action.closeServerMaintenanceModal())
		})
    }
}

export const unpause = () => {

    return dispatch => {
		ajax.unpause( (status, response) => {
            if(status === 401) dispatch(handleUnauthorized())
            dispatch(action.closeServerMaintenanceModal())
		})
    }
}

const handleUnauthorized = () => {
    return dispatch => {
        dispatch(
			logout({message: 'Your token is invalid or expired, you will be redirected to the log-in page'})
		)
    }
}
