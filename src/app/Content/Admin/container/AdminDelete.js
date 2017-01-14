import React, {Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'

import { deleteAdmin } from '../middleware/middleware'
import { hideAdminDeleteModal } from '../action/modalAction'

class AdminDelete extends Component {

    handleClick = () => {
        this.props.dispatch(deleteAdmin(this.props.profile))
    }

    handleHide = () => {
        this.props.dispatch(hideAdminDeleteModal())
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
			modal: state.admin.modal.delete,
			loader: state.admin.loader.delete,
			profile : state.admin.selected ? 
				state.admin.list.find(admin => admin._id == state.admin.selected) : 
				null

		})	
	)(AdminDelete)
