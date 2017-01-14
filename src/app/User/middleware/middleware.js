import { browserHistory } from 'react-router'
import async from 'async'

import * as User from './../action/action'
import * as Loader from './../action/loaderAction'
import { handle }from'./handleResponse'
import * as validate from './validation'
import * as ajax from './ajax'
import * as process from './processResponse'

import * as errorAction from '../action/errorAction'
import * as action from '../action/action'

export const login = (data, redirect) => {

    function validateOnBrowser(data, cb) {
        validate.validateLogin(data, error => {
            if (error) cb(error, null)
            if (!error) cb(null, data)
        })
    }

    function ajaxLogin(data, cb) {
        ajax.login(data, (status, response) => {
            if (response.error && status === 400) cb({message: 'Invalid username and/or password'}, null)
            if (response.error && status !== 400) cb(response.error, null)
            if (!response.error) cb(null, response)
        })
    }

    function ajaxGetDetails(data, cb) {
		const role = Object.keys(data.user.roles)[0]
		
		if(role == 'admin'){
			ajax.adminDetails(data.authHeader, (status, response) => {
			    if (response.error && status === 400) cb({message: 'Invalid username and/or password'}, null)
			    if (response.error && status !== 400) cb(response.error, null)
			    if (!response.error) cb(null, response, data)
			})
		}

		if(role == 'account'){
			ajax.userDetails(data.authHeader, (status, response) => {
			    if (response.error && status === 400) cb({message: 'Invalid username and/or password'}, null)
			    if (response.error && status !== 400) cb(response.error, null)
			    if (!response.error) cb(null, response, data)
			})
		}

    }

    return dispatch => {

		dispatch(Loader.loaderOn())

        async.waterfall([
            async.apply(validateOnBrowser, data),
            ajaxLogin,
			ajaxGetDetails
        ], (error, response, auth) => {
			dispatch(Loader.loaderOff())
            if (!error) {
                dispatch(authenticated(auth, response, redirect))
            }
            if (error) {
                dispatch(handle(error, response, errorAction.loginError, null))
            }
        })

    }
}

export const authenticate = (history) => {
    return dispatch => {

		const role = sessionStorage.getItem('role')
		const header = sessionStorage.getItem('header')

		if(!role || !header){
			browserHistory.push(`${history.pathname}?redirect=${history.query.redirect}`)
		}

		if(role == 'admin'){
			ajax.adminDetails(header, (status, response) => {
				if(response.error) browserHistory.push(`${history.pathname}?redirect=${history.query.redirect}`)
				if(!response.error) dispatch(authenticated(null, response, history.query.redirect))
			})
		}

		if(role == 'account'){
			ajax.userDetails(header, (status, response) => {
				if(response.error) browserHistory.push(`${history.pathname}?redirect=${history.query.redirect}`)
				if(!response.error) dispatch(authenticated(null, response, history.query.redirect))
			})
		}
    }
}

export const logout = (message = null) => {
    return dispatch => {
        ajax.logout((status, response) => {
            dispatch(process.error(message))
            setTimeout(()=> {
                sessionStorage.removeItem('header')
                sessionStorage.removeItem('role')
				browserHistory.push('login')
				dispatch(action.logOutUser())
            },3000)
        })
    }
}

const authenticated = (auth, data, redirect) => {

	if(auth){
		sessionStorage.setItem('header', auth.authHeader)
		sessionStorage.setItem('role', Object.keys(auth.user.roles)[0])
	}

    return dispatch => {

        dispatch(action.logInUser(data))

        setTimeout(() => {
            dispatch(handle(
                null,
                data.session,
                null,
                {message: 'You are log in!'}
            ))
			browserHistory.push(redirect || '/')
        },500)

    }
}
