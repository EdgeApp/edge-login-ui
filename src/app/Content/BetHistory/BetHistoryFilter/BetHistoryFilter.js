import React, {Component} from 'react'
import { connect } from 'react-redux'

import * as action from './action'

class BetHistoryFiltery extends Component {

	_handleUserId = (e) => {
		this.props.dispatch(
			action.filterUserId(e.target.value)
		)
	}

	_handleUserIdEnter = (e) => {
		if(e.keyCode === 13) {
			this.props.dispatch(
				action.filterUserIdValue(this.props.userId)
			)
		}
	}

	_handleUserIdClick = (e) => {
		this.props.dispatch(
			action.filterUserIdValue(this.props.userId)
		)
	}

    render() {
        return (
			<div className="admin-form">
				<div className="row">
					<div className="col-xs-5">
						<div className="smart-widget sm-left sml-50 mt10">
							<label className="field">
								<input type="text" 
									name="username" 		
									className="gui-input" 
									placeholder="Search UserId" 
									value={this.props.username}
									onChange={this._handleUserId}
									onKeyDown={this._handleUserIdEnter}
								/>
							</label>
							<button type="button" className="button btn-primary" onClick={this._handleUserIdClick}>
								<i className="fa fa-search" />
							</button>
						</div>
					</div>
				</div>
			</div>
        )
    }
}

export default connect( state => ({
	userId		: state.betHistory.filter.userId,
	userIdValue	: state.betHistory.filter.userIdValue
}) ) ( BetHistoryFiltery )
