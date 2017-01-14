import { showAlert } from '../../../Alert/action'
import async from 'async'

export const success = (response, modal = null, message, action, id = null) => {
    return dispatch => {
        async.series([
                function(callback){
                    setTimeout(function(){
                        dispatch(showAlert('alert-success', message))
                    }, 50)
                    callback(null, null)
                },
                function(callback){
                    if(modal) dispatch(modal())
                    callback(null, null);
                },
                function(callback){
                    dispatch(action(response, id))
                    callback(null, null);
                }
            ])
    }
}

export const processSuccessWithId = (dispatch, response, modal = null, alert, action, id) => {
    setTimeout(function(){
        dispatch( showAlert( 'alert-success',  alert.message ) )
    }, 1)
    if(modal) {
        dispatch(modal())
    }
    dispatch(action(id,response))
}

export const error = (error) => {
    return dispatch => dispatch(showAlert( 'alert-danger', error.message))
}
