import request from 'superagent'
import config from '../../../../config.json'

const api = config.current

export const login = (data, cb) => {
    request
        .post(`${api}login/admin`)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const userDetails = (header, cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .get(`${api}accounts/my`)
        .set('Authorization', header)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const adminDetails = (header, cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .get(`${api}admins/my`)
        .set('Authorization', header)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const logout = cb => {
	const authorization = sessionStorage.getItem('header')
    request
        .del(`${api}logout`)
        .set('Authorization', authorization)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}
