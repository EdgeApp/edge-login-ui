import React,{Component} from 'react'
import {connect} from 'react-redux'

import * as Modal from '../action/modalAction'
import Profile_Blank from '../component/Profile_Blank'
import Profile from '../component/Profile'

class Detail extends Component {

    handleAddAdmin = () => {
        this.props.dispatch(Modal.showAdminAddModal())
    }

    handleDeleteAdmin = () => {
        this.props.dispatch(Modal.showAdminDeleteModal())
    }

    handleEditAdminUser = () => {
        // this.props.dispatch(Modal.showAdminEditUserModal())
    }

    handleEditAdminAccount = () => {
        // this.props.dispatch(Modal.showAdminEditAccountModal())
    }

    render() {
        if(!this.props.profile) return <Profile_Blank handleAddAdmin={this.handleAddAdmin}/>
		if(this.props.profile) {
			return (
				<Profile 
					handleAddAdmin={this.handleAddAdmin}
					handleDeleteAdmin={this.handleDeleteAdmin}
					handleEditAdminUser={this.handleEditAdminUser}
					handleEditAdminAccount={this.handleEditAdminAccount}
				   	profile={this.props.profile}
			    />	
			)
		}	
    }
}

export default connect(
			state => ({
				profile : state.admin.selected ? 
					state.admin.list.find(admin => admin._id == state.admin.selected) : 
					null	
			})
		)(Detail)
