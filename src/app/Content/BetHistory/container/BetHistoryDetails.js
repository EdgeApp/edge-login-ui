import React,{Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import date from '../../../../services/date'

import { hideBetHistoryDetailModal } from '../action/modalAction'

class BetHistoryDetails extends Component {

    _handleHide = () => {
        this.props.dispatch(hideBetHistoryDetailModal())
    }


    render() {

        return (
            <Modal show={this.props.modal} onHide={this._handleHide} bsSize="lg">
                <div className="admin-form bet-history-details">

                    <div className="panel">
                        <div className="panel-heading text-center">
                            <span className="panel-title">
                                <i className="fa fa-cogs" />Bet Details
                            </span>
                        </div>
                    </div>

					<div className="panel-body p25">
						<div className="row">
							<div className="col-xs-3 text-right">
								<p><strong>ID : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details._id}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>User ID : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.userId}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Satoshi Bet : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.satoshiBet}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Time Created : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{date(this.props.details.createdAt)}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Time of Cashout : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{date(this.props.details.cashoutAt)}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Cashout Multiplier : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.cashoutMultiplier}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Auto-Cashout : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.autoCashout}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Satoshi Won : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.satoshiWon}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Bonus : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.bonus}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Round Id : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.roundId}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Was Canceled : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.wasCanceled}</p>	
							</div>
						</div>
					</div>

					<div className="panel-footer text-center">
						<button type="button" className="button btn-default" onClick={this._handleHide}>Close</button>
					</div>

                </div>
            </Modal>
        )

    }
}

export default connect( state => ({
	details : state.betHistory.selected ? 
		state.betHistory.list.find(bet => bet._id == state.betHistory.selected) : 
		{},
	modal: state.betHistory.modal.details
}) )(BetHistoryDetails)
