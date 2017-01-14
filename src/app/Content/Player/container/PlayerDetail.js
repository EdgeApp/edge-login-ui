import React,{Component} from 'react'
import {connect} from 'react-redux'

import { editPlayer } from '../middleware/middleware'
import Profile_Blank from '../component/Profile_Blank'
import Profile from '../component/Profile'

class Detail extends Component {

    handleToggleMute = () => {
        this.props.dispatch(
			editPlayer(
				this.props.profile._id,
				{ isMuted : this.props.profile.isMuted ? false : true }		
			)
		)
    }

    handleToggleIgnore = () => {
        this.props.dispatch(
			editPlayer(
				this.props.profile._id,
				{ isIgnored : this.props.profile.isIgnored ? false : true }		
			)
		)
    }

    handleToggleDisable = () => {
        this.props.dispatch(
			editPlayer(
				this.props.profile._id,
				{ isDisabled : this.props.profile.isDisabled ? false : true }		
			)
		)
    }

    handleToggleBan = () => {
        this.props.dispatch(
			editPlayer(
				this.props.profile._id,
				{ isBanned : this.props.profile.isBanned ? false : true }		
			)
		)
    }

    render() {

        if(!this.props.profile) {
			return (
				<Profile_Blank 
					handleToggleMute={ this.handleToggleMute }
					handleToggleIgnore={ this.handleToggleIgnore }
					handleToggleDisable={ this.handleToggleDisable }
					handleToggleBan={ this.handleToggleBan }
					profile={ this.props.profile }
				/>	
			)	
		}

		if(this.props.profile) {
			return (
				<Profile 
					handleToggleMute={ this.handleToggleMute }
					handleToggleIgnore={ this.handleToggleIgnore }
					handleToggleDisable={ this.handleToggleDisable }
					handleToggleBan={ this.handleToggleBan }
					profile={ this.props.profile } 
				/>	
			)
		}	
    }
}

export default connect( state => ({
		profile : state.player.selected ? 
			state.player.list.find(player => player._id == state.player.selected) : 
			{}	
	})
)(Detail)
