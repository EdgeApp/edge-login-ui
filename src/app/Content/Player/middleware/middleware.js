import async from 'async'

import * as ajax from './ajax'
import * as validate from './validation'
import * as modal from '../action/modalAction'
import * as action from '../action/action'
import * as loaderAction from '../action/loaderAction'
import * as errorAction from '../action/errorAction'
import { handle } from './handleResponse'
import {logout} from '../../../User/middleware/middleware'

export const listPlayers = () => {

    return dispatch => {

		dispatch(loaderAction.tableLoaderOn())
        ajax.listPlayers((status, response) => {
            if(status === 401) dispatch(handleUnauthorized())
            if(status === 200) dispatch(action.listPlayers(response.data))
			dispatch(loaderAction.tableLoaderOff())
        })

    }
}

export const listPlayersOnline = () => {

    return dispatch => {

        ajax.listPlayersOnline((status, response) => {
            if(status === 401) dispatch(handleUnauthorized())
            if(status === 200) dispatch(action.listOnlinePlayers(response))
        })

    }
}

export const editPlayer = (id, payload) => {

    return dispatch =>{

        ajax.editPlayer(id ,payload, (status,response) => {
            if(status === 401) dispatch(handleUnauthorized())
            if(status === 200) dispatch(action.editPlayer(response))
        })

    }
}

const handleUnauthorized = () => {
    return dispatch => {
        dispatch(logout({message: 'Your token is invalid or expired, you will be redirected to the log-in page'}))
    }
}
