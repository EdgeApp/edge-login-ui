import React, {Component} from 'react'
import { connect } from 'react-redux'
import { selectBetHistory } from '../action/action'
import _ from 'lodash'
import date from '../../../../services/date'

import { selectBets } from '../action/action'
import { showBetHistoryDetailModal } from '../action/modalAction'

import  Table from '../component/Table'

class BetHistoryTable extends Component {

    handleClick = (id) => {
        this.props.dispatch(selectBets(id))
        this.props.dispatch(showBetHistoryDetailModal())
    }

	_filterRows = (bets) => {
		const userIdFilter = new RegExp(this.props.filter.userIdValue)

		const checkUserId = (userId) => {
			return userIdFilter.test(userId)
		}
 
		const filtering = (bets,index) => {
			return checkUserId(bets.userId)
		}

		return _.filter(bets, filtering)	
	}

	_createRows = () => {
		const filteredRow = this.props.bets ? this._filterRows(this.props.bets) : this.props.bets

		const mapping = (bet,index) => {
			return (
				<tr 
					className="default-row-hover"
					key={index}
					value={bet.id}
					onClick={this.handleClick.bind(null, bet._id)}
				>
					<td>{bet._id}</td>
					<td>{bet.userId}</td>
					<td>{bet.satoshiBet}</td>
					<td>{date(bet.createdAt)}</td>
					<td>{bet.cashoutMultiplier}</td>
					<td>{bet.satoshiWon}</td>
					<td>{bet.wasCanceled}</td>
				</tr>
			)
		}
		return _.map(this.props.bets, mapping)
	}

    render() {
        return <Table rows={this._createRows()} loader={this.props.loader}/>
    }
}

export default connect( state => ({ 
	bets 		: state.betHistory.list,
	loader 		: state.betHistory.loader.table,
	filter 		: state.betHistory.filter
}))(BetHistoryTable)
