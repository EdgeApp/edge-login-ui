import React,{Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

export default class EditAccountForm extends Component {


    render() {

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
            <Modal show={this.props.modal} onHide={this.props.handleHide}>
                <div className="admin-form">
                    <div className="panel">
                        <div className="panel-heading text-center">
                            <span className="panel-title">
                                <i className="fa fa-pencil" />{`Edit ${this.props.profile.name.first} ${this.props.profile.name.last}'s Credentials`}</span>
                        </div>
                        <form method="post"
                              onSubmit={this.props.handleSubmitForm}
                        >
                            <div className="panel-body p25">
                                <div className="section row">
                                    <div className="col-xs-12">
                                        <label htmlFor="username"
                                               className={`field prepend-icon ${this.props.ajaxErrors.username ? 'state-error': ''}`}
                                        >
                                            <input type="text"
                                                   name="username"
                                                   id="username"
                                                   className="gui-input"
                                                {...this.props.fields.username}
                                            />
                                            <label htmlFor="username" className="field-icon">
                                                <i className="fa fa-user" />
                                            </label>
                                        </label>
                                        { this.props.errorDescription('username') }
                                    </div>
                                </div>
                                <div className="section row">
                                    <div className="col-md-6 col-xs-12">
                                        <label htmlFor="password"
                                               className={`field prepend-icon ${this.props.ajaxErrors.password ? 'state-error': ''}`}
                                        >
                                            <input type="password"
                                                   name="password"
                                                   id="password"
                                                   className="gui-input"
                                                   placeholder="Change Password"
                                                {...this.props.fields.password}
                                            />
                                            <label htmlFor="password" className="field-icon">
                                                <i className="fa fa-lock" />
                                            </label>
                                        </label>
                                        { this.props.errorDescription('password') }
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <label htmlFor="birthdate"
                                               className={`field prepend-icon ${this.props.ajaxErrors.password_confirmation ? 'state-error': ''}`}
                                        >
                                            <input type="password"
                                                   name="password_confirmation"
                                                   id="password_confirmation"
                                                   className="gui-input"
                                                   placeholder="Re-Enter Change Password"
                                                {...this.props.fields.password_confirmation}
                                            />
                                            <label htmlFor="password_confirmation" className="field-icon">
                                                <i className="fa fa-lock" />
                                            </label>
                                        </label>
                                        { this.props.errorDescription('password_confirmation') }
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer text-center">
                                <button type="button" className="button btn-default" onClick={this.props.handleHide}>Close</button>
								{SubmitButton()}
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }
}
