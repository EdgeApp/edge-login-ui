import React, {Component} from 'react'
import { connect } from 'react-redux' 

import BetHistoryTable from './container/BetHistoryTable' 
import BetHistoryDetails from './container/BetHistoryDetails' 
import BetHistoryFilter from './BetHistoryFilter/BetHistoryFilter' 

import { listBets } from './middleware/middleware'

class BetHistory extends React.Component {

    componentWillMount = () => {
        this.props.dispatch(listBets())
    }

    render() {
        return (
            <section id="game-history">
                <div className="col-xs-12">
					<BetHistoryTable />
					<BetHistoryFilter />
                </div>
				<BetHistoryDetails />
            </section>
        )
    }
}

export default connect()(BetHistory)
