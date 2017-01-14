import React,{Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { reduxForm } from 'redux-form'

import { hideOperatorEditUserModal } from '../action/modalAction'
import { editOperatorUser } from '../middleware/middleware'
import EditUserForm from '../component/EditUserForm'

class OperatorEditUser extends Component {

    handleSubmitForm = (e) => {
        e.preventDefault()
		if(!this.props.loader){
			this.props.dispatch(editOperatorUser(this.props.profile, formatFields(this.props.values)))
		}
    }

    handleHide = () => {
        this.props.dispatch(hideOperatorEditUserModal())
    }

    errorDescription = (input) => {
        return this.props.ajaxErrors[input] ?
            this.props.ajaxErrors[input].map(function(error){
                return <em className="state-error" key="">{error}</em>
            }) : ''
    }

    render() {
		if(!this.props.profile) return <div className="hidden"></div>
		if(this.props.profile){
			return (
				<EditUserForm handleSubmitForm={this.handleSubmitForm}
								  handleHide={this.handleHide}
								  errorDescription={this.errorDescription}
								  {...this.props}
				/>
			)
		}
    }
}

const formatFields = (data) => {
    return {
        username 		        : data.username || null,
        password 		        : data.password || null,
        password_confirmation   : data.password_confirmation || null
    }
}


export default reduxForm({
    form: 'employeeEditUserForm',
    fields: [
        'username',
        'password',
        'password_confirmation'
    ],
}, state => ({
	ajaxErrors		: state.operator.error.editUser,
	modal			: state.operator.modal.editUser,
	loader			: state.operator.loader.editUser,
	profile			: state.operator.selected ? 
						state.operator.list.find(operator => operator._id == state.operator.selected) : 
						null,
	initialValues	: {
		username		: state.operator.selected ? 
							state.operator.list.find(operator => operator._id == state.operator.selected).user.name : 
							null	
	}
}))(OperatorEditUser)
