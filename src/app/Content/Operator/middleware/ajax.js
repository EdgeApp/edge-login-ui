import request from 'superagent'
import config from '../../../../../config.json'

const api = config.current

export const listOperators = (cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .get(`${api}accounts`)
        .set('Authorization', authorization)
        .end((error, response) => {
			cb(response.status, response.body)
        })
}

export const addOperatorAccount = (data, cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .post(`${api}accounts`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const addOperatorUser = (data, cb) => {
    const authorization = sessionStorage.getItem('header')
    request
        .post(`${api}users`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const addOperatorGroup = (data, id, cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .put(`${api}accounts/${id}/link`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const editOperatorUser = (id, data, cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .put(`${api}accounts/${id}/user`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const editOperatorAccount = (id, data, cb) => {
	const authorization = sessionStorage.getItem('header')
	request
        .put(`${api}accounts/${id}`)
        .set('Authorization', authorization)
        .send(data)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const  deleteOperator = (id, cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .del(`${api}accounts/${id}`)
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
