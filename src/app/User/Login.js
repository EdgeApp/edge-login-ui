import React,{Component} from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { login } from './middleware/middleware'

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
		if(!this.props.loader){
			this.props.dispatch(login(this.props.values, this.props.location.query.redirect))
		}
    }

    errorDescription(input) {
        return this.props.ajaxErrors[input] ?
            this.props.ajaxErrors[input].map(function(error){
                return <em className="state-error" key="">{error}</em>
            }) : ''
    }


    render() {

		const loginButton = () => {
			if(this.props.loader){
				return	(
					<button type="submit" className="button btn-primary mr10" disabled> 
						<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
					</button>
				)
			}else{
				return (
					<button type="submit" className="button btn-primary mr10"> 
						<span className="">Sign In</span>
					</button>
				)	
					
			}
		}

        return (
            <div id="main" className="animated fadeIn login-container">
                <section id="content_wrapper">
                    <section id="content">
                        <div className="admin-form theme-info mw500 login-container" id="login">
                            <div className="row table-layout">
                                <a href="dashboard.html" title="Return to Dashboard">
                                </a>
                            </div>
                            <div className={`panel mt30 mb25
                                                ${this.props.ajaxErrors.username ||
                                                this.props.ajaxErrors.password ||
                                                this.props.ajaxErrors.message ?
                                                'panel-error': ''}
                                            `}>
                                <form method="post" action="/" id="contact" onSubmit={this.handleSubmit}>
                                    <div className="panel-body bg-light p25 pb15">
                                        <div className="section">
                                            <label htmlFor="username" className="field-label text-muted fs18 mb10">Username</label>
                                            <label htmlFor="username"
                                                   className={`field prepend-icon ${this.props.ajaxErrors.username ? 'state-error': ''}`}
                                            >
                                                <input type="text"
                                                       name="username"
                                                       id="username"
                                                       className="gui-input"
                                                       placeholder="Enter username"
                                                       {...this.props.fields.username}
                                                />
                                                <label htmlFor="username" className="field-icon">
                                                    <i className="fa fa-user"/>
                                                </label>
                                            </label>
                                            { this.errorDescription('username') }
                                        </div>
                                        <div className="section">
                                            <label htmlFor="password" className="field-label text-muted fs18 mb10">Password</label>
                                            <label htmlFor="password"
                                                   className={`field prepend-icon ${this.props.ajaxErrors.password ? 'state-error': ''}`}
                                            >
                                                <input type="password"
                                                       name="password"
                                                       id="password"
                                                       className="gui-input"
                                                       placeholder="Enter password"
                                                       {...this.props.fields.password}
                                                />
                                                <label htmlFor="password" className="field-icon">
                                                    <i className="fa fa-lock"/>
                                                </label>
                                            </label>
                                            { this.errorDescription('password') }
                                        </div>
                                        <div className="section">
                                            <p className="error-message">{ this.props.ajaxErrors.message ? this.props.ajaxErrors.message : '' }</p>
                                        </div>
                                    </div>
                                    <div className="panel-footer clearfix text-center">
											{ loginButton() }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}


Login = reduxForm({
    form: 'login',
    fields: [
        'username',
        'password'
    ],
    initialValues : {
        gender: 'false'
    }
}, state => ({
    ajaxErrors : state.user.error,
	loader:	state.user.loader
})
)(Login)

export default Login
