export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'

export const showAlert = (status, message, timeout = 3) => {
    return {
        type : SHOW_ALERT,
        status : status,
        message : message,
        timeout : timeout*1000
    }
}

export const closeAlert = (status, message) => {
    return {
        type : HIDE_ALERT
    }
}