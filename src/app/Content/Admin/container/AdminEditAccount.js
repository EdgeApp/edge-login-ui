import React,{Component} from 'react'
import { reduxForm, getValues } from 'redux-form'

import { hideAdminEditAccountModal } from '../action/modalAction'
import { editAdminAccount } from '../middleware/middleware'

import EditAccountForm from '../component/EditAccountForm/EditAccountForm'

class AdminEditAccount extends Component {

    handleSubmitForm = (e) => {
        e.preventDefault()
		if(!this.props.loader){
			this.props.dispatch(editAdminAccount(this.props.profile, formatFields(this.props.values)))
		}
    }

    handleHide = () => {
        this.props.dispatch(hideAdminEditAccountModal())
    }

    errorDescription = (input) => {
        return this.props.ajaxErrors[input] ?
            this.props.ajaxErrors[input].map(function(error){
                return <em className="state-error">{error}</em>
            }) : ''
    }

    render() {
        return <EditAccountForm handleSubmitForm={this.handleSubmitForm}
                                 handleHide={this.handleHide}
                                 errorDescription={this.errorDescription}
                                 {...this.props}
        />

    }
}


const formatFields = (data) => {
    return {
		first		: data.first       || undefined,
        middle		: data.middle      || undefined,
        last		: data.last        || undefined,
        email		: data.email       || undefined
    }
}

const mapStateToProps = state => ({
	ajaxErrors		: state.operator.error.editAccount,
	modal			: state.operator.modal.editAccount,
	loader			: state.operator.loader.editAccount,
	profile			: state.operator.selected ? 
						state.operator.list.find(operator => operator._id == state.operator.selected) : 
						null,
	initialValues	: {
		first		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).name.first 	: null,
        middle		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).name.middle 	: null,
        last		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).name.last 	: null,
        email		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).details.email : null
	}
})

export default AdminEditAccount = reduxForm({
    form: 'employeeEditAccountForm',
    fields: [
        'first',
        'middle',
        'last',
        'email'
    ]}, mapStateToProps)(AdminEditAccount)
