import React, {Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'

import { pause, unpause } from './middleware/middleware'
import { closeServerMaintenanceModal } from './action'

class ServerMaintenance extends Component {

    _handleClick = () => {
		if(this.props.gameinfo.game){
			this.props.gameinfo.game.paused ? 	this.props.dispatch(unpause()) : this.props.dispatch(pause())
		}
    }

    _handleHide = () => {
        this.props.dispatch(closeServerMaintenanceModal())
    }

    render() {
		const paused = this.props.gameinfo.game ? this.props.gameinfo.game.paused : null
        return (
            <Modal show={this.props.modal} onHide={this._handleHide}>
                <div className="modal-body text-center p50">
                    <h1>{`Are you sure you want to ${paused ? 'remove' : 'put'} the server on maintenance mode`}</h1>
                </div>
                <div className="modal-footer text-center">
                    <button type="button" className="btn btn-default btn-xl" onClick={this._handleHide}>Close</button>
					<button type="button" className="btn btn-danger btn-xl" onClick={this._handleClick}>
						<span>{paused ? 'Maintenance OFF' : 'Maintenance ON'}</span>
					</button>
                </div>
            </Modal>
        )
    }
}

export default connect( state => ({
	modal 		: state.serverMaintenanceModal,
	gameinfo 	: state.socket.gameinfo
}) )(ServerMaintenance)
