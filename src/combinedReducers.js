import { combineReducers } from 'redux'

import form from './formReducer'

import * as Player from './app/Content/Player/reducer/reducer'
import * as PlayerLoader from './app/Content/Player/reducer/loaderReducer'
import * as PlayerFilter from './app/Content/Player/PlayerFilter/reducer'

import * as Admin from './app/Content/Admin/reducer/reducer'
import * as AdminLoader from './app/Content/Admin/reducer/loaderReducer'
import * as AdminErrors from './app/Content/Admin/reducer/errorReducer'
import * as AdminModals from './app/Content/Admin/reducer/modalReducer'

import * as GameHistory from './app/Content/GameHistory/reducer/reducer'
import * as GameHistoryLoader from './app/Content/GameHistory/reducer/loaderReducer'
import { gameHistoryDetailModal } from './app/Content/GameHistory/reducer/modalReducer'

import * as BetHistory from './app/Content/BetHistory/reducer/reducer'
import * as BetHistoryLoader from './app/Content/BetHistory/reducer/loaderReducer'
import * as BetHistoryFilter from './app/Content/BetHistory/BetHistoryFilter/reducer'
import { betHistoryDetailModal } from './app/Content/BetHistory/reducer/modalReducer'

import * as User from './app/User/reducer/reducer'
import * as UserError from './app/User/reducer/errorReducer'
import * as UserLoader from './app/User/reducer/loaderReducer'

import { alert } from './app/Alert/reducer'
import { serverMaintenanceModal } from './app/Server/reducer'

import * as socket from './socket/reducer'

const store = combineReducers({

	//Player Store
    player : combineReducers({
        list   		: Player.players,
        online   	: Player.online,
        selected    : Player.selected,
		loader		: combineReducers({
			table			: PlayerLoader.tableLoader,
		}),
		filter 		: combineReducers({
			username		: PlayerFilter.username,		
			usernameValue	: PlayerFilter.usernameValue,		
			status			: PlayerFilter.status,		
			details			: PlayerFilter.details,		
			mute			: PlayerFilter.mute,		
			ignore			: PlayerFilter.ignore,		
			disable			: PlayerFilter.disable,		
			ban				: PlayerFilter.ban
		})
    }),

	//Admin Store
    admin : combineReducers({
        list   		: Admin.admins,
        selected    : Admin.selected,
        modal       : combineReducers({
            add                : AdminModals.adminAddModal,
            editUser  		   : AdminModals.adminEditUserModal,
            editAccount        : AdminModals.adminEditAccountModal,
            delete             : AdminModals.adminDeleteModal
        }),
        error       : combineReducers({
            add             : AdminErrors.addAdminError,
            editUser       	: AdminErrors.editAdminUserError,
            editAccount     : AdminErrors.editAdminAccountError,
        }),
		loader		: combineReducers({
			table			: AdminLoader.tableLoader,
            add             : AdminLoader.addFormLoader,
    //         editUser  		: AdminLoader.editUserFormLoader,
    //         editAccount     : AdminLoader.editAccountFormLoader,
            delete          : AdminLoader.deleteFormLoader
		})
    }),

	//Game History Store
    gameHistory : combineReducers({
        list   		: GameHistory.games,
        selected    : GameHistory.selected,
        modal       : combineReducers({
            details : gameHistoryDetailModal
        }),
		loader		: combineReducers({
			table	: GameHistoryLoader.tableLoader
		})
    }),
	
	//Bet History Store
    betHistory : combineReducers({
        list   		: BetHistory.bets,
        selected    : BetHistory.selected,
        modal       : combineReducers({
            details : betHistoryDetailModal
        }),
		loader		: combineReducers({
			table	: BetHistoryLoader.tableLoader
		}),
		filter 		: combineReducers({
			userId		: BetHistoryFilter.userId,		
			userIdValue	: BetHistoryFilter.userIdValue
		})
    }),
	
	//User Store
	user        : combineReducers({
		profile : User.user,
		error   : UserError.error,
		loader	: UserLoader.loader
	}),
	
	// Server
	serverMaintenanceModal,
	
	//Sockets
	socket 		: combineReducers({
		gameinfo	: socket.gameinfo
	}),
	
    // Alert Store
	alert,
	
    //redux-form
    form,

    // Alert Store
	alert,
	
    //redux-form
    form,

})

export default store
