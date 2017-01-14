import * as errorAction from '../action/errorAction'
import { validationErrorProcess } from './validationErrorProccessor'
import * as process from './processResponse'

export const handle = (error, response, action, options = null) => {

    return dispatch => {

        if(error && error.isJoi) {
			const validationError = validationErrorProcess(error)
			dispatch(action(validationError))
		}

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
