import { SHOW_SERVER_MAINTENANCE_MODAL , HIDE_SERVER_MAINTENANCE_MODAL } from './action'

export const serverMaintenanceModal = (state = false, action) => {
    switch (action.type) {
        case SHOW_SERVER_MAINTENANCE_MODAL :
			return true
        case HIDE_SERVER_MAINTENANCE_MODAL :
            return false
        default :
            return state
    }
}
