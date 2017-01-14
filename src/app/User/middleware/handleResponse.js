import { validationErrorProcess } from './validationErrorProccessor'
import * as process from './processResponse'
//import * as errorAction from '../action/errorAction'

export const handle = (error, response, action, options = null) => {

    return dispatch => {

        if(error && error.isJoi) dispatch(action(validationErrorProcess(error)))

        if(error && !error.isJoi) dispatch(action(error))

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
