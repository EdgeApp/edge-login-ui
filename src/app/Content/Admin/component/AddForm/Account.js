import React,{Component} from 'react'

export default class Account extends Component {

    shouldComponentUpdate(nextProps) {
        return  this.props.username                 !== nextProps.username  ||
            	this.props.password                 !== nextProps.password  ||
            	this.props.password_confirmation    !== nextProps.password_confirmation ||
            	this.props.ajaxErrors               !== nextProps.ajaxErrors;
    }

    errorDescription(input) {
        return this.props.ajaxErrors[input] ?
            this.props.ajaxErrors[input].map(function(error){
                return <em className="state-error" key="">{error}</em>
            }) : ''
    }

    render() {
        return (
            <section>

                <div className="section row">
                    <div className="col-xs-4">
                        <label htmlFor="username"
						   className={`field prepend-icon ${this.props.ajaxErrors.username ? 'state-error': ''}`}
                        >
                            <input type="text"
                                   name="username"
                                   id="username"
                                   className="gui-input"
                                   placeholder="Enter Username"
                                {...this.props.username}
                            />
                            <label htmlFor="username" className="field-icon">
                                <i className="fa fa-user" />
                            </label>
                        </label>
                        { this.errorDescription('username') }
                    </div>
                    <div className="col-xs-4">
                        <label htmlFor="password"
						   className={`field prepend-icon ${this.props.ajaxErrors.password ? 'state-error': ''}`}
                        >
                            <input type="password"
                                   name="password"
                                   id="password"
                                   className="gui-input"
                                   placeholder="Enter Password"
                                {...this.props.password}
                            />
                            <label htmlFor="password" className="field-icon">
                                <i className="fa fa-lock" />
                            </label>
                        </label>
                        { this.errorDescription('password') }
                    </div>
                    <div className="col-xs-4">
                        <label htmlFor="password_confirmation"
						   className={`field prepend-icon ${this.props.ajaxErrors.password_confirmation ? 'state-error': ''}`}
                        >
                            <input type="password"
                                   name="password_confirmation"
                                   id="password_confirmation"
                                   className="gui-input"
                                   placeholder="Re-enter Password"
                                {...this.props.password_confirmation}
                            />
                            <label htmlFor="password_confirmation" className="field-icon">
                                <i className="fa fa-lock" />
                            </label>
                        </label>
                        { this.errorDescription('password_confirmation') }
                    </div>
                </div>

            </section>
        )
    }
}
