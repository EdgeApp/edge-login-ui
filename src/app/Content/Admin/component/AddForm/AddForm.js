import React,{Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import Basic from './Basic'
import Details from './Details'
import Account from './Account'

export default class AddForm extends Component {

    render() {

        const {
			fields: { 
				first,
				middle,
				last,
				email,
				group,
				username,
				password,
				password_confirmation
			}
		} = this.props;

		const SubmitButton = () => {
			if(this.props.loader){
				return	(
					<button type="submit" className="button btn-primary ml10" disabled> 
						<i className="fa fa-spinner fa-spin" aria-hidden="true"></i> Loading
					</button>
				)
			}else{
				return (
					<button type="submit" className="button btn-primary ml10"> 
						<span className="">Submit</span>
					</button>
				)	
			}
		}

        return (
            <Modal show={this.props.modal} onHide={this.props.handleHide} bsSize="lg">
                <div className="admin-form">

                    <div className="panel">
                        <div className="panel-heading text-center">
                            <span className="panel-title">
                                <i className="fa fa-pencil" />Add Admin
                            </span>
                        </div>
                    </div>

                    <form onSubmit={::this.props.handleSubmitForm}>

                        <div className="panel-body p25">

                            <h2 className="pb10">Full Name</h2>
                            <Basic
                                first={first}
                                middle={middle}
                                last={last}
                                ajaxErrors={this.props.ajaxErrors}
                            />

                            <h2 className="pt10 pb10">Admin Info</h2>
                            <Details
                                email={email}
                                group={group}
                                ajaxErrors={this.props.ajaxErrors}
                            />

                            <h2 className="pt10 pb10">Account Info</h2>
                            <Account
                                username={username}
                                password={password}
                                password_confirmation={password_confirmation}
                                ajaxErrors={this.props.ajaxErrors}
                            />

                        </div>

                        <div className="panel-footer text-center">
                            <button type="button" className="button btn-default" onClick={this.props.handleHide}>Close</button>
							{SubmitButton()}
                        </div>

                    </form>
                </div>
            </Modal>
        )

    }
}
