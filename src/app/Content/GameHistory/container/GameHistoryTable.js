import React, {Component} from 'react'
import { connect } from 'react-redux'
import { selectGameHistory } from '../action/action'
import _ from 'lodash'
import date from '../../../../services/date'

import { selectGames } from '../action/action'
import { showGameHistoryDetailModal } from '../action/modalAction'

import  Table from '../component/Table'

class GameHistoryTable extends Component {

    handleClick = (id) => {
        this.props.dispatch(selectGames(id))
        this.props.dispatch(showGameHistoryDetailModal())
    }

	_createRows = () => {
		const mapping = (game,index) => {
			return (
				<tr 
					className="default-row-hover"
					key={index}
					value={game.id}
					onClick={this.handleClick.bind(null, game._id)}
				>
					<td>{game._id}</td>
					<td>{date(game.createdAt)}</td>
					<td>{date(game.finishedAt)}</td>
					<td>{game.status}</td>
					<td>{game.secretHash}</td>
					<td>{game.result}</td>
				</tr>
			)
		}
		return _.map(this.props.games, mapping)
	}

    render() {
        return <Table rows={this._createRows()} loader={this.props.loader}/>
    }
}

export default connect( state => ({ 
	games 		: state.gameHistory.list,
	loader 		: state.gameHistory.loader.table
}))(GameHistoryTable)
