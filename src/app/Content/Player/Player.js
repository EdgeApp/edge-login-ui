import React, {Component} from 'react'
import { connect } from 'react-redux'

import PlayerTable from './container/PlayerTable'
import PlayerDetail from './container/PlayerDetail'
import PlayerFilter from './PlayerFilter/PlayerFilter'

import { listPlayers,listPlayersOnline } from './middleware/middleware'

class Player extends Component {

    componentWillMount = () => {
        this.props.dispatch(listPlayers())
        this.props.dispatch(listPlayersOnline())
    }

    render() {
        return (
            <section id="player">
				<div className="row">
					<div className="col-md-5">
						<PlayerTable />
					</div>
					<div className="col-md-7">
						<PlayerDetail />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<PlayerFilter />
					</div>	
				</div>
			</section>
        )
    }
}

export default connect()(Player)
