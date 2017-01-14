import async from 'async'

import * as ajax from './ajax'
import * as validate from './validation'
import * as modal from '../action/modalAction'
import * as action from '../action/action'
import * as loaderAction from '../action/loaderAction'
import * as errorAction from '../action/errorAction'
import { handle } from './handleResponse'
import {logout} from '../../../User/middleware/middleware'

export const listAdmins = () => {

    return dispatch => {

		dispatch(loaderAction.tableLoaderOn())
        ajax.listAdmins((status, response) => {
            if(status === 401) dispatch(handleUnauthorized())
            if(status === 200) dispatch(action.listAdmins(response.data))
			dispatch(loaderAction.tableLoaderOff())
        })

    }
}

export const addAdmin = (data) => {

	function validateOnBrowser(payload, cb) {
		validate.validateAddAdmin(payload, err => {
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

		ajax.addAdminUser(userData, (status, response) => {
			if(status === 401) cb(status, null)
			if(response.error) cb(response, null)
			if(!response.error)cb(null, data, response)
		})
	}

	function ajaxCreateAccount(data, user,cb) {
		const accountData = {
			name : 	data.account.first + ' ' + data.account.middle + ' ' + data.account.last
		}

		ajax.addAdminAccount(accountData, (status,response) => {
			if(status === 401) cb(status, null)
			if(response.error) cb(response, null)
			if(!response.error)cb(null, data, user, response)
		})
	}

	function ajaxAddLink(data, user, account, cb) {
		ajax.addAdminLink({username: user.username}, account._id, (status,response) => {
			if(status === 401) cb(status, null)
			if(response.error) cb(response, null)
			if(!response.error)cb(null, data, user, response)
		})
	}

	function ajaxAddGroup(data, user, account, cb) {
		ajax.addAdminGroup(data.group, account._id, (status, response) => {
			if(status === 401) cb(status, null)
			if(response.error) cb(response, null)
			if(!response.error)cb(null, response)
		})
	}

    return dispatch =>{
		dispatch(loaderAction.addFormLoaderOn())
        async.waterfall([
            async.apply(validateOnBrowser, data),
            ajaxCreateUser,
			ajaxCreateAccount,
			ajaxAddLink,
			ajaxAddGroup
        ], (err, result) => {
			dispatch(loaderAction.addFormLoaderOff())
            if(err && err === 401) return dispatch(handleUnauthorized())
            if(err && err !== 401) return dispatch(handle(err, result, errorAction.onAddAdminError, null))
            if(!err) {
                const option = {
                    modal : modal.hideAdminAddModal,
                    message : `You have successfully created ${result.name.first} ${result.name.last}`,
                    action : action.addAdmin
                }
                return dispatch(handle(err,result, action.addAdmin, option))
            }
        })
    }
}

export const editAdminAccount = (admin, payload) => {

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

        ajax.editAdminAccount(admin._id ,payload, (status,response) => {
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
            if(err && err !== 401) dispatch(handle(err,result, errorAction.onEditAdminAccountError, null))
            if(!err) {
                const option = {
                    modal : modal.hideAdminEditAccountModal,
                    message : `You have successfully updated ${result.name.first} ${result.name.last} account`
                }
                dispatch(handle(err,result, action.editAdminAccount, option))
            }
			dispatch(loaderAction.editAccountFormLoaderOff())
        })
    }

}

export const editAdminUser = (admin, payload) => {

    function validateOnBrowser(payload, cb) {
        validate.validateAdminEditUser(payload, err => {
            if(err) cb(err, null)
            if(!err) cb(null,payload)
        })
    }

    function ajaxToAPI(payload, cb) {
        ajax.editAdminUser(admin._id ,payload, (status,response) => {
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
            if(err && err !== 401) dispatch(handle(err,result, errorAction.onEditAdminUserError, null))
            if(!err) {
                const option = {
                    modal : modal.hideAdminEditUserModal,
                    message : `You have successfully updated ${admin.name.first} ${admin.name.last} credentials`
                }
                dispatch(handle(err,result, action.editAdminUser, option))
            }
			dispatch(loaderAction.editUserFormLoaderOff())
        })
    }

}


export const deleteAdmin = ( admin ) => {

    return dispatch => {
		dispatch(loaderAction.deleteFormLoaderOn())
        ajax.deleteAdmin(admin._id, (status, response)=> {
            if(status === 401) dispatch(handleUnauthorized())
            if(response.error && status !== 401) dispatch(handle(err, result, null, null))
            if(!response.error && status !== 401) {
                const option = {
                    modal : modal.hideAdminDeleteModal,
                    message : `You have successfully deleted ${admin.name.first} ${admin.name.last}`,
                }
                dispatch(handle(null,admin, action.deleteAdmin, option))
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
