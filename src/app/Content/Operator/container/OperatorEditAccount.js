import React,{Component} from 'react'
import { reduxForm, getValues } from 'redux-form'

import { hideOperatorEditAccountModal } from '../action/modalAction'
import { editOperatorAccount } from '../middleware/middleware'

import EditAccountForm from '../component/EditAccountForm/EditAccountForm'

class OperatorEditAccount extends Component {

    handleSubmitForm = (e) => {
        e.preventDefault()
		if(!this.props.loader){
			this.props.dispatch(editOperatorAccount(this.props.profile, formatFields(this.props.values)))
		}
    }

    handleHide = () => {
        this.props.dispatch(hideOperatorEditAccountModal())
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
		company		: data.company     || undefined,
        position	: data.position    || undefined,
        phone		: data.phone       || undefined,
        email		: data.email       || undefined,
        address		: data.address     || undefined
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
		first		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).name.first : null,
        middle		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).name.middle : null,
        last		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).name.last : null,
		company		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).company : null,
        position	: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).details.position : null,
        phone		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).details.phone : null,
        email		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).details.email : null,
        address		: state.operator.selected ? state.operator.list.find(operator => operator._id == state.operator.selected).details.address : null
	}
})

export default OperatorEditAccount = reduxForm({
    form: 'employeeEditAccountForm',
    fields: [
        'first',
        'middle',
        'last',
		'company',
        'position',
        'phone',
        'email',
        'address',
    ]}, mapStateToProps)(OperatorEditAccount)
