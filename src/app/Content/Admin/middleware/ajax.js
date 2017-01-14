import request from 'superagent'
import config from '../../../../../config.json'

const api = config.current

export const listAdmins = (cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .get(`${api}admins`)
        .set('Authorization', authorization)
        .end((error, response) => {
			cb(response.status, response.body)
        })
}

export const addAdminAccount = (data, cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .post(`${api}admins`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const addAdminUser = (data, cb) => {
    const authorization = sessionStorage.getItem('header')
    request
        .post(`${api}users`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const addAdminLink = (data, id, cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .put(`${api}admins/${id}/user`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const addAdminGroup = (data, id, cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .put(`${api}admins/${id}/groups`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const editAdminUser = (id, data, cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .put(`${api}admins/${id}/user`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const editAdminAccount = (id, data, cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .put(`${api}admins/${id}`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const  deleteAdmin = (id, cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .del(`${api}admins/${id}`)
        .set('Authorization', authorization)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const editPicture = (id, data, cb) => {
    request
        .put(`${api}employees/${id}/photo`)
        .send(data)
        .end((error, response) => {
            if(response.status === 500) {
                addPicture(id, data, cb)
            }else{
                cb(response.status, response.body)
            }
        })
}

const addPicture = (id, data, cb) => {
    request
        .post(`${api}employees/${id}/photo`)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}
