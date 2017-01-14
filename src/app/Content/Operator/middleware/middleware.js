import async from 'async'

import * as ajax from './ajax'
import * as validate from './validation'
import * as modal from '../action/modalAction'
import * as action from '../action/action'
import * as loaderAction from '../action/loaderAction'
import * as errorAction from '../action/errorAction'
import { handle } from './handleResponse'
import {logout} from '../../../User/middleware/middleware'

export const listOperators = () => {

    return dispatch => {

		dispatch(loaderAction.tableLoaderOn())
        ajax.listOperators((status, response) => {
            if(status === 401) dispatch(handleUnauthorized())
            if(status === 200) dispatch(action.listOperators(response.data))
			dispatch(loaderAction.tableLoaderOff())
        })

    }
}

export const addOperator = (data) => {


	function validateOnBrowser(payload, cb) {
		validate.validateAddOperator(payload, err => {
			if(err) cb(err, null)
			if(!err) cb(null,payload)
		})
	}

	function ajaxCreateUser(data, cb) {
		
		const userData = {
			username 	: data.user.username,
			email		: data.user.email,
			password	: data.user.password
		}

		ajax.addOperatorUser(userData, (status,response) => {
			if(status === 401) cb(status, null)
			if(response.error) cb(response.error, null)
			if(!response.error)cb(null, data, response)
		})
	}

	function ajaxCreateAccount(data, user,cb) {

		const accountData = {
			name: {
				first: data.account.first,
				middle: data.account.middle,
				last: data.account.last
			},
			company: data.account.company,
			details: {
				position: data.account.position,
				phone: data.account.phone,
				email: data.account.email,
				address: data.account.address
			}

		}

		ajax.addOperatorAccount(accountData, (status,response) => {
			if(status === 401) cb(status, null)
			if(response.error) cb(response.error, null)
			if(!response.error)cb(null, user, response)
		})
	}

	function ajaxAddGroup(user, account, cb) {
		ajax.addOperatorGroup({userId: user._id}, account._id, (status,response) => {
			if(status === 401) cb(status, null)
			if(response.error) cb(response.error, null)
			if(!response.error)cb(null, response)
		})
	}

    return dispatch =>{
		dispatch(loaderAction.addFormLoaderOn())
        async.waterfall([
            async.apply(validateOnBrowser, data),
            ajaxCreateUser,
			ajaxCreateAccount,
			ajaxAddGroup
        ], (err, result) => {
            if(err && err === 401) dispatch(handleUnauthorized())
            if(err && err !== 401) dispatch(handle(err,result, errorAction.onAddOperatorError, null))
            if(!err) {
                const option = {
                    modal : modal.hideOperatorAddModal,
                    message : `You have successfully created ${result.name.first} ${result.name.last}`,
                    action : action.addOperator
                }
                dispatch(handle(err,result, action.addOperator, option))
            }
			dispatch(loaderAction.addFormLoaderOff())
        })
    }
}

export const editOperatorAccount = (operator, payload) => {

    function validateOnBrowser(payload, cb) {
        validate.validateEmployeeEditAccount(payload, err => {
            if(err) cb(err, null)
            if(!err) cb(null,payload)
        })
    }

    function ajaxToAPI(data, cb) {

		const payload = {
			name: {
				first: data.first,
				middle: data.middle,
				last: data.last
			},
			company: data.company,
			details: {
				position: data.position,
				phone: data.phone,
				email: data.email,
				address: data.address
			}

		}

        ajax.editOperatorAccount(operator._id ,payload, (status,response) => {
            if(status === 401) cb(status, null)
            if(response.error) cb(response.error, null)
            if(!response.error)cb(null, response)
        })
    }

    return dispatch =>{

		dispatch(loaderAction.editAccountFormLoaderOn())
        async.waterfall([
            async.apply(validateOnBrowser, payload),
            ajaxToAPI
        ], (err, result) => {
            if(err && err === 401) dispatch(handleUnauthorized())
            if(err && err !== 401) dispatch(handle(err,result, errorAction.onEditOperatorAccountError, null))
            if(!err) {
                const option = {
                    modal : modal.hideOperatorEditAccountModal,
                    message : `You have successfully updated ${result.name.first} ${result.name.last} account`
                }
                dispatch(handle(err,result, action.editOperatorAccount, option))
            }
			dispatch(loaderAction.editAccountFormLoaderOff())
        })
    }

}

export const editOperatorUser = (operator, payload) => {

    function validateOnBrowser(payload, cb) {
        validate.validateOperatorEditUser(payload, err => {
            if(err) cb(err, null)
            if(!err) cb(null,payload)
        })
    }

    function ajaxToAPI(payload, cb) {
        ajax.editOperatorUser(operator._id ,payload, (status,response) => {
            if(status === 401) cb(status, null)
            if(response.error) cb(response.error, null)
            if(!response.error)cb(null, response)
        })
    }
    return dispatch => {

		dispatch(loaderAction.editUserFormLoaderOn())
        async.waterfall([
            async.apply(validateOnBrowser, payload),
            ajaxToAPI,
        ], (err, result) => {
            if(err && err === 401) dispatch(handleUnauthorized())
            if(err && err !== 401) dispatch(handle(err,result, errorAction.onEditOperatorUserError, null))
            if(!err) {
                const option = {
                    modal : modal.hideOperatorEditUserModal,
                    message : `You have successfully updated ${operator.name.first} ${operator.name.last} credentials`
                }
                dispatch(handle(err,result, action.editOperatorUser, option))
            }
			dispatch(loaderAction.editUserFormLoaderOff())
        })
    }

}


export const deleteOperator = ( operator ) => {

    return dispatch => {
		dispatch(loaderAction.deleteFormLoaderOn())
        ajax.deleteOperator(operator._id, (status, response)=> {
            if(status === 401) dispatch(handleUnauthorized())
            if(response.error && status !== 401) dispatch(handle(err,result, null, null))
            if(!response.error && status !== 401) {
                const option = {
                    modal : modal.hideOperatorDeleteModal,
                    message : `You have successfully deleted ${operator.name.first} ${operator.name.last}`,
                }
                dispatch(handle(null,operator, action.deleteOperator, option))
            }
			dispatch(loaderAction.deleteFormLoaderOff())
        })
    }

}

// export const uploadPicture = ( employee ) => {
//
//     const tabs = [
//         'file',
//         'camera',
//         'url',
//         'facebook'
//     ]
//
//     const options = {
//         imagesOnly : true,
//         previewStep: true,
//         crop : '1x1',
//         tabs  : tabs
//     }
//
//     function uploadPicture (employee, cb) {
//         uploadcare.openDialog(null, options)
//             .done( file => {
//                 file.done(result => {
//                         if(result.uuid) return cb(null, result, employee)
//                     })
//                     .fail( err => {
//                         return cb(err, null)
//                     })
//             })
//             .fail (err => {
//                 return cb(err, null)
//             })
//     }
//
//     function ajaxToAPI (result, employee, cb) {
//         ajax.editPicture(employee.id, {cdn : `https://ucarecdn.com/${result.uuid}/`}, (status, response) =>{
//             if(status === 401) cb(status, null)
//             if(response.error) cb(response.error, null)
//             if(!response.error)cb(null, response, employee)
//         })
//     }
//
//     return dispatch => {
//         async.waterfall([
//             async.apply(uploadPicture, employee),
//             ajaxToAPI
//         ], (err, result, employee) => {
//             if(err && err === 401) dispatch(handleUnauthorized())
//             if(err && err !== 401) dispatch(handle(err,result, null, null))
//             if(!err) {
//                 const option = {
//                     message :
//                         `You have successfully updated
//                         ${employee.gender ? 'Ms. ' : 'Mr. ' }
//                         ${employee.firstname}
//                         ${employee.lastname}
//                         picture`
//                 }
//                 dispatch(handle(err,result, action.uploadPicture, option))
//             }
//         })
//     }
//
// }

const handleUnauthorized = () => {
    return dispatch => {
        dispatch(logout({message: 'Your token is invalid or expired, you will be redirected to the log-in page'}))
    }
}
