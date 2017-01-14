import React, {Component} from 'react'
import { reduxForm } from 'redux-form'

import { hideOperatorAddModal } from '../action/modalAction'
import { addOperator } from '../middleware/middleware'

import AddForm from '../component/AddForm/AddForm'

class OperatorAdd extends Component {

    handleHide = () => {
        this.props.dispatch(hideOperatorAddModal())
    }

    handleSubmitForm = (e) => {
        e.preventDefault()
		if(!this.props.loader){
			this.props.dispatch(addOperator(formatFields(this.props.values)))
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
            first 		: data.first 	|| undefined,
            middle 		: data.middle 	|| undefined,
            last 		: data.last 	|| undefined,
            company 	: data.company 	|| undefined,
            position 	: data.position || undefined,
            email  		: data.email 	|| undefined,
            phone 		: data.phone 	|| undefined,
			address		: data.address  || undefined
        },
        user : {
            username 		        : data.username,
            email			        : data.email,
            password 		        : data.password,
            password_confirmation   : data.password_confirmation
        }
    }
}

OperatorAdd = reduxForm({
    form: 'approverAdd',
    fields: [
        'first',
        'middle',
        'last',
		'company',
        'position',
        'phone',
        'email',
        'address',
        'username',
        'password',
        'password_confirmation'
    ]}, 
	state => ({
		modal : state.operator.modal.add,
		loader: state.operator.loader.add,
		ajaxErrors: state.operator.error.add

	}) )(OperatorAdd)

export default OperatorAdd
