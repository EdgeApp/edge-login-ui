import { showAlert } from '../../../Alert/action'

export const processSuccess = (dispatch, response, modal = null, alert, action) => {
    setTimeout(function(){
        dispatch( showAlert( 'alert-success',  alert.message ) )
    }, 1)
    if(modal) {
        dispatch(modal())
    }
    return dispatch(action(response))
}

export const processSuccessWithId = (dispatch, response, modal = null, alert, action, id) => {
    setTimeout(function(){
        dispatch( showAlert( 'alert-success',  alert.message ) )
    }, 1)
    if(modal) {
        dispatch(modal())
    }
    return dispatch(action(id,response))
}

export const processError = (dispatch, error) => {
    return dispatch( showAlert( 'alert-danger', error.message ))
}
