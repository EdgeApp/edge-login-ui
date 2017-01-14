import request from 'superagent'
import config from '../../../../config.json'

const api = config.current

export const pause = (cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .get(`${api}game/pause`)
        .set('Authorization', authorization)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}

export const unpause = (cb) => {
	const authorization = sessionStorage.getItem('header')
    request
        .get(`${api}game/unpause`)
        .set('Authorization', authorization)
        .end((error, response) => {
            cb(response.status, response.body)
        })
}
