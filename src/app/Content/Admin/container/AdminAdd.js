import React, {Component} from 'react'
import { reduxForm } from 'redux-form'

import { hideAdminAddModal } from '../action/modalAction'
import { addAdmin } from '../middleware/middleware'

import AddForm from '../component/AddForm/AddForm'

class AdminAdd extends Component {

    handleHide = () => {
        this.props.dispatch(hideAdminAddModal())
    }

    handleSubmitForm = (e) => {
        e.preventDefault()
		if(!this.props.loader){
			this.props.dispatch(
				addAdmin(
					formatFields(this.props.values)
				)
			)
		}
    }

    render () {
        return <AddForm handleHide={this.handleHide}
                        handleSubmitForm={this.handleSubmitForm}
                        {...this.props}
        />
    }
}

const formatFields = (data) => {
    return {
        account : {
			first 		: data.first 	? data.first.toString().trim() : undefined,
            middle 		: data.middle  	? data.middle.toString().trim() : undefined,
            last 		: data.last  	? data.last.toString().trim() : undefined
        },
        user : {
            username 		        : data.username,
            email			        : data.email,
            password 		        : data.password,
            password_confirmation   : data.password_confirmation
        },
		group :	{
			groups : {
				[data.group.toLowerCase()]	: data.group	
			}
		} 
    }
}

AdminAdd = reduxForm({
    form: 'adminAdd',
    fields: [
        'first',
        'middle',
        'last',
        'email',
        'group',
        'username',
        'password',
        'password_confirmation'
    ],
	initialValues: {
		group: 'Administrator'	
	}}, 
	state => ({
		modal : state.admin.modal.add,
		loader: state.admin.loader.add,
		ajaxErrors: state.admin.error.add
	}) )(AdminAdd)

export default AdminAdd
