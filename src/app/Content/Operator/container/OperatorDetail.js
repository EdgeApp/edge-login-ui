import React,{Component} from 'react'
import {connect} from 'react-redux'

import * as Modal from '../action/modalAction'
import Profile_Blank from '../component/Profile_Blank'
import Profile from '../component/Profile'

class Detail extends Component {

    handleAddOperator = () => {
        this.props.dispatch(Modal.showOperatorAddModal())
    }

    handleDeleteOperator = () => {
        this.props.dispatch(Modal.showOperatorDeleteModal())
    }

    handleEditOperatorUser = () => {
        this.props.dispatch(Modal.showOperatorEditUserModal())
    }

    handleEditOperatorAccount = () => {
        this.props.dispatch(Modal.showOperatorEditAccountModal())
    }

    render() {

        if(!this.props.profile) return <Profile_Blank handleAddOperator={this.handleAddOperator}/>
		if(this.props.profile) {
			return (
				<Profile 
					handleAddOperator={this.handleAddOperator}
					handleDeleteOperator={this.handleDeleteOperator}
					handleEditOperatorUser={this.handleEditOperatorUser}
					handleEditOperatorAccount={this.handleEditOperatorAccount}
				   	profile={this.props.profile}
			    />	
			)
		}	
    }
}

export default connect(
			state => ({
				profile : state.operator.selected ? 
					state.operator.list.find(operator => operator._id == state.operator.selected) : 
					null	
			})
		)(Detail)
