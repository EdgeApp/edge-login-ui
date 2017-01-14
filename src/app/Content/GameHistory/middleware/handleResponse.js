import * as process from './processResponse'

export const handle = (error, response, action, options = null) => {

    return dispatch => {

        if(error && !error.isJoi) dispatch(process.error(error))

        if(!error) {
            dispatch(process.success(
                response,
                options.modal,
                options.message,
                action,
                options.id
            ))
        }
    }

}
