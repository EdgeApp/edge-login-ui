import React, {Component} from 'react'
import { connect } from 'react-redux' 

import GameHistoryTable from './container/GameHistoryTable' 
import GameHistoryDetails from './container/GameHistoryDetails' 

import { listGames } from './middleware/middleware'

class GameHistory extends React.Component {

    componentWillMount = () => {
        this.props.dispatch(listGames())
    }

    render() {
        return (
            <section id="game-history">
                <div className="col-xs-12">
					<GameHistoryTable />
                </div>
				<GameHistoryDetails />
            </section>
        )
    }
}

export default connect()(GameHistory)
