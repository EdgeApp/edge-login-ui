import React, {Component} from 'react'
import { connect } from 'react-redux'

import * as action from './action'

class Player extends Component {

	_handleUsername = (e) => {
		this.props.dispatch(
			action.filterUsername(e.target.value)
		)
	}

	_handleUsernameEnter = (e) => {
		if(e.keyCode === 13) {
			this.props.dispatch(
				action.filterUsernameValue(this.props.username)
			)
		}
	}

	_handleUsernameClick = (e) => {
		this.props.dispatch(
			action.filterUsernameValue(this.props.username)
		)
	}

	_handleChangeDetails = (e) => {
		this.props.dispatch(
			action.filterDetails(e.target.value)
		)
	}

	_handleChangeStatus = (e) => {
		this.props.dispatch(
			action.filterStatus(e.target.value)
		)
	}

	_handleChangePenaltyMute = (e) => {
		this.props.dispatch(
			action.filterPenaltyMute(e.target.checked)
		)
	}

	_handleChangePenaltyIgnore = (e) => {
		this.props.dispatch(
			action.filterPenaltyIgnore(e.target.checked)
		)
	}

	_handleChangePenaltyDisable = (e) => {
		this.props.dispatch(
			action.filterPenaltyDisable(e.target.checked)
		)
	}

	_handleChangePenaltyBan = (e) => {
		this.props.dispatch(
			action.filterPenaltyBan(e.target.checked)
		)
	}

    render() {
		console.log(this.props)
        return (
			<div className="panel panel-primary">
				<div className="panel-body">
					<div className="admin-form">
						<div className="row">
							<div className="col-xs-4">
								<div className="smart-widget sm-left sml-50 mt10">
									<label className="field">
										<input type="text" 
											name="username" 		
											className="gui-input" 
											placeholder="Search Username" 
											value={this.props.username}
											onChange={this._handleUsername}
											onKeyDown={this._handleUsernameEnter}
										/>
									</label>
									<button type="button" className="button btn-primary" onClick={this._handleUsernameClick}>
										<i className="fa fa-search" />
									</button>
								</div>
							</div>
							<div className="col-xs-3">
								<label className="field select mt10">
									<select name="details" value={this.props.details} onChange={this._handleChangeDetails}>
										<option value="default">Default</option>
										<option value="date_active">Latest Active</option>
										<option value="date_created">Time Created</option>
									</select>
									<i className="arrow"></i>
								</label>
							</div>
							<div className="col-xs-5">
								<div className="row">
									<div className="col-xs-12 mb10">
										<div className="option-group field">
											<label className="option option-primary">
												<input type="radio" value="online" checked={this.props.status === 'online'} onChange={this._handleChangeStatus}/>
												<span className="radio"></span>Online Only
											</label>
											<label className="option option-primary">
												<input type="radio" value="offline" checked={this.props.status === 'offline'} onChange={this._handleChangeStatus}/>
												<span className="radio"></span>Offline Only
											</label>
											<label className="option option-primary">
												<input type="radio" value="all" checked={this.props.status === 'all'} onChange={this._handleChangeStatus}/>
												<span className="radio"></span>All Players
											</label>
										</div>
									</div>	
								</div>
								<div className="row">
									<div className="col-xs-12 mb10">
										<div className="option-group field">
											<label className="option option-primary">
												<input type="checkbox" name="mute" checked={this.props.mute} onChange={this._handleChangePenaltyMute}/>
												<span className="checkbox"></span>Muted
											</label>
											<label className="option option-primary">
												<input type="checkbox" name="ignore" checked={this.props.ignore} onChange={this._handleChangePenaltyIgnore} />
												<span className="checkbox"></span>Ignored
											</label>
											<label className="option option-primary">
												<input type="checkbox" name="disable" checked={this.props.disable} onChange={this._handleChangePenaltyDisable} />
												<span className="checkbox"></span>Disabled
											</label>
											<label className="option option-primary">
												<input type="checkbox" name="ban" checked={this.props.ban} onChange={this._handleChangePenaltyBan} />
												<span className="checkbox"></span>Banned
											</label>
										</div>
									</div>	
								</div>
							</div>
						</div>
					</div>
				 </div>				
			</div>
        )
    }
}

export default connect( state => ({
	username	: state.player.filter.username,
	usernameValue	: state.player.filter.usernameValue,
	status		: state.player.filter.status,
	details		: state.player.filter.details,
	mute		: state.player.filter.mute,
	ignore		: state.player.filter.ignore,
	disable		: state.player.filter.disable,
	ban			: state.player.filter.ban
}) ) ( Player )
