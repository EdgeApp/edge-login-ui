import React,{Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import date from '../../../../services/date'

import { hideGameHistoryDetailModal } from '../action/modalAction'

class GameHistoryDetails extends Component {

    _handleHide = () => {
        this.props.dispatch(hideGameHistoryDetailModal())
    }


    render() {

        return (
            <Modal show={this.props.modal} onHide={this._handleHide} bsSize="lg">
                <div className="admin-form game-history-details">

                    <div className="panel">
                        <div className="panel-heading text-center">
                            <span className="panel-title">
                                <i className="fa fa-cogs" />Game Details
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
								<p><strong>Time Created : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{date(this.props.details.createdAt)}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Time Started : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{date(this.props.details.beganAt)}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Time Finished : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{date(this.props.details.finishedAt)}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Status : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.status}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Secret Seed : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.secretSeed}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Secret Hash : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.secretHash}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Result : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.result}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Bitcoin Block Index : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.bitcoinBlockIndex}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Bitcoin Block Hash : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.bitcoinBlockHash}</p>	
							</div>
						</div>
						<div className="row mt5">
							<div className="col-xs-3 text-right">
								<p><strong>Error : </strong></p>
							</div>
							<div className="col-xs-9">
								<p>{this.props.details.error}</p>	
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
	details : state.gameHistory.selected ? 
		state.gameHistory.list.find(game => game._id == state.gameHistory.selected) : 
		{},
	modal: state.gameHistory.modal.details
}) )(GameHistoryDetails)
