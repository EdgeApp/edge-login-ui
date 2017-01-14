import * as ADMIN_ACTION from './app/Content/Admin/action/action'
import { reducer } from 'redux-form'

export default reducer.plugin({
	
	adminAdd: (state, action) => {
		switch(action.type) {
			case ADMIN_ACTION.ADD_ADMIN:
				return { 
					...state, 
					first 					: {},
					middle 					: {},
					last					: {},
					email					: {},
					group 					: {},
					username 				: {},
					password  				: {},
					password_confirmation 	: {}
				}
			default:
				return state;
	   }
    }

})
