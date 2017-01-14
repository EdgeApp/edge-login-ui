import React, {Component} from 'react'
import { connect } from 'react-redux'
import { selectPlayer } from '../action/action'
import _ from 'lodash'

import  Table from '../component/Table'

class PlayerTable extends Component {

    handleClick = (id) => {
        this.props.dispatch(selectPlayer(id))
    }

	_filterRows = (players) => {

		const usernameFilter = new RegExp(this.props.filter.usernameValue)

		const checkUsername = (username) => {
			return usernameFilter.test(username)
		}
	
		const checkStatus = (player) => {
			if(this.props.filter.status === 'online'){
				const playerFilter = 	_.find(this.props.online, (value, key) => value.userId === player.user.id)	
				return playerFilter ? true : false
			}
			if(this.props.filter.status === 'offline'){
				const playerFilter = _.find(this.props.online, (value, key) => value.userId === player.user.id)	
				return playerFilter ? false : true
			}
			if(this.props.filter.status === 'all'){
				return true	
			}
		}
		
		const checkMute = (isMuted) => {
			if(this.props.filter.mute){
				return true	
			}else{
				return isMuted ? false : true	
			}
		}

		const checkIgnore = (isIgnored) => {
			if(this.props.filter.ignore){
				return true	
			}else{
				return isIgnored ? false : true	
			}
		}
		
		const checkDisable = (isDisabled) => {
			if(this.props.filter.disable){
				return true	
			}else{
				return isDisabled ? false : true	
			}
		}

		const checkBan = (isBanned) => {
			if(this.props.filter.ban){
				return true	
			}else{
				return isBanned ? false : true
			}
		}

		const filtering = (player,index) => {
			return checkUsername(player.user.name) && 
				checkStatus(player) &&
				checkMute(player.isMuted) && 
				checkIgnore(player.isIgnored) && 
				checkDisable(player.isDisabled) && 
				checkBan(player.isBanned)
		}

		return _.filter(players, filtering)	
	}

	_createRows = () => {
		const filteredRow = this.props.players ? this._filterRows(this.props.players) : this.props.players
		const mapping = (player,index) => {
			return (
				<tr 
					className={`default-row-hover ${this.props.profile && this.props.profile._id  == player._id ? 'default-row-active' : ''}`}
					key={index}
					value={player.id}
					onClick={this.handleClick.bind(null, player._id)}
				>
					<td>{player.user.name}</td>
				</tr>
			)
		}
		return _.map(filteredRow, mapping)
	}

    render() {
        return <Table rows={this._createRows()} loader={this.props.loader}/>
    }
}

export default connect( state => ({ 
	players 	: state.player.list,
	online 		: state.player.online,
	loader 		: state.player.loader.table,
	profile 	: state.player.selected ? 
		state.player.list.find(player => player._id == state.player.selected) : null,
	filter 		: state.player.filter
}))(PlayerTable)
