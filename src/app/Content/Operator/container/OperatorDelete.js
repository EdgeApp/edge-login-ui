import React, {Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'

import { deleteOperator } from '../middleware/middleware'
import { hideOperatorDeleteModal } from '../action/modalAction'

class OperatorDelete extends Component {

    handleClick = () => {
        this.props.dispatch(deleteOperator(this.props.profile))
    }

    handleHide = () => {
        this.props.dispatch(hideOperatorDeleteModal())
    }

    render() {

		const SubmitButton = () => {
			if(this.props.loader){
				return	(
					<button type="button" className="btn btn-danger btn-xl" disabled>
						<i className="fa fa-spinner fa-spin" aria-hidden="true"></i> Loading
					</button>
				)
			}else{
				return (
					<button type="button" className="btn btn-danger btn-xl" onClick={this.handleClick}>
						<span>DELETE</span>
					</button>
			   )	
			}
		}

		const firstname = this.props.profile ? this.props.profile.name.first : null 
		const lastname = this.props.profile ? this.props.profile.name.last : null 

        return (
            <Modal show={this.props.modal} onHide={this.handleHide}>
                <div className="modal-body text-center p50">
                    <h1>{`Are you sure you wanted to delete ${firstname} ${lastname}`}</h1>
                </div>
                <div className="modal-footer text-center">
                    <button type="button" className="btn btn-default btn-xl" onClick={this.handleHide}>Close</button>
					{ SubmitButton() }
                </div>
            </Modal>
        )
    }
}

export default connect(
		state => ({
			modal: state.operator.modal.delete,
			loader: state.operator.loader.delete,
			profile : state.operator.selected ? 
				state.operator.list.find(operator => operator._id == state.operator.selected) : 
				null

		})	
	)(OperatorDelete)
