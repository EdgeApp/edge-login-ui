import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {logout} from '../User/middleware/middleware'
import { showServerMaintenanceModal } from '../Server/action'

class Menu extends React.Component {

	handleClick = (e) => {
		this.props.dispatch(logout({message: 'You have sign out, you will be redirected to the sign in page'}))
	}

	handleOpenServerMaintenanceModal = (e) => {
		this.props.dispatch(showServerMaintenanceModal())
	}

    render(){

		const paused = this.props.gameinfo.game ? this.props.gameinfo.game.paused : null
		const role = sessionStorage.getItem('role') 	

		if(role == 'admin'){
			return(
				<aside id="sidebar_left" className="nano nano-primary affix">
				<div className="sidebar-left-content nano-content">
					<ul className="nav sidebar-menu">

						<li className="sidebar-label pt20">Administrator</li>
						<li>
							<Link to="/admin">
								<span className="glyphicon glyphicon-king" />
								<span className="sidebar-title">Admin Users</span>
							</Link>
						</li>
						<li>
							<a href="#" onClick={this.handleOpenServerMaintenanceModal}>
								<span className="glyphicon glyphicon-wrench" />
								<span className="sidebar-title">{`Server - ${ paused ? 'paused' : 'normal' }`}</span>
							</a>
						</li>

						<li className="sidebar-label pt15">Player Management</li>
						<li>
							<Link to="/player">
								<span className="glyphicon glyphicon-user" />
								<span className="sidebar-title">Players</span>
							</Link>
						</li>
						<li className="sidebar-label pt15">Game Management</li>
						<li>
							<Link to="/game-history">
								<span className="glyphicon glyphicon-list-alt" />
								<span className="sidebar-title">Game History</span>
							</Link>
							<Link to="/bet-history">
								<span className="glyphicon glyphicon-import" />
								<span className="sidebar-title">Bet History</span>
							</Link>
						</li>
						<li className="sidebar-label pt15">Bankroll Management</li>
						<li>
							<a href="/#">
								<span className="glyphicon glyphicon-transfer" />
								<span className="sidebar-title">Process Withdraws</span>
							</a>
						</li>
						<li>
							<a href="/#">
								<span className="glyphicon glyphicon-list" />
								<span className="sidebar-title">Balance</span>
							</a>
						</li>
						<li>
							<a href="/#">
								<span className="glyphicon glyphicon-hourglass" />
								<span className="sidebar-title">Transaction History</span>
							</a>
						</li>
						<li className="sidebar-label pt20">User</li>
						<li>
							<a href="#" onClick={this.handleClick}>
								<span className="fa fa-sign-out" />
								<span className="sidebar-title">Sign Out</span>
							</a>
						</li>
					</ul>

				</div>
			</aside>
			)
		}			

		if(role == 'account'){
			return(
				<aside id="sidebar_left" className="nano nano-primary affix">
				<div className="sidebar-left-content nano-content">
					<ul className="nav sidebar-menu">

						<li className="sidebar-label pt15">ATM</li>
						<li>
							<Link to="/ATM">
							<span className="fa fa-btc" />
								<span className="sidebar-title">ATM Management</span>
							</Link>
						</li>
					   
						<li className="sidebar-label pt20">User</li>
						<li>
							<a href="#" onClick={this.handleClick}>
								<span className="fa fa-sign-out" />
								<span className="sidebar-title">Sign Out</span>
							</a>
						</li>
					</ul>

				</div>
			</aside>
			)
	 	}			
       
    }
}

export default connect( state => ({
	gameinfo 	: state.socket.gameinfo
}) )(Menu)
