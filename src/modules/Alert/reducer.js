import { SHOW_ALERT , HIDE_ALERT } from './action'

const alertDefault = {
    show    : false,
    status  : 'alert-info',
    message : '',
    timeout : 0
}

export const alert = (state = alertDefault, action) => {
    switch (action.type) {
        case (SHOW_ALERT) :
            return {
                show    : true,
                status  : action.status,
                message : action.message,
                timeout : action.timeout
            }
        case (HIDE_ALERT) :
            return alertDefault
        default :
            return alertDefault
    }
}