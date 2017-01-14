export const SHOW_SERVER_MAINTENANCE_MODAL = 'SHOW_SERVER_MAINTENANCE_MODAL'
export const HIDE_SERVER_MAINTENANCE_MODAL = 'HIDE_SERVER_MAINTENANCE_MODAL'

export const showServerMaintenanceModal = () => {
	return {
		type : SHOW_SERVER_MAINTENANCE_MODAL
	}
}

export const closeServerMaintenanceModal = () => {
	return {
		type : HIDE_SERVER_MAINTENANCE_MODAL
	}
}

