import React,{Component} from 'react'

export default class Personal extends Component {

    shouldComponentUpdate(nextProps) {
        return  this.props.position		 !== nextProps.position      ||
				this.props.company		 !== nextProps.company		 ||
                this.props.phone   		 !== nextProps.phone    	 ||
                this.props.email      	 !== nextProps.email       	 ||
				this.props.address 		 !== nextProps.address  	 ||
                this.props.ajaxErrors    !== nextProps.ajaxErrors;

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
                    <div className="col-md-4 col-xs-12">
                        <label htmlFor="company"
						   className={`field prepend-icon ${this.props.ajaxErrors.company ? 'state-error': ''}`}
                        >
                            <input type="text"
                                   name="company"
                                   id="company"
                                   className="gui-input"
                                   placeholder="Company"
                                {...this.props.company}
                            />
                            <label htmlFor="company" className="field-icon">
                                <i className="fa fa-building" />
                            </label>
                        </label>
                        { this.errorDescription('company') }
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <label htmlFor="position"
						   className={`field prepend-icon ${this.props.ajaxErrors.position ? 'state-error': ''}`}
                        >
                            <input type="text"
                                   name="position"
                                   id="position"
                                   className="gui-input"
                                   placeholder="Position"
                                {...this.props.position}
                            />
                            <label htmlFor="position" className="field-icon">
                                <i className="fa fa-briefcase" />
                            </label>
                        </label>
                        { this.errorDescription('position') }
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <label htmlFor="email"
						   className={`field prepend-icon ${this.props.ajaxErrors.email ? 'state-error': ''}`}
                        >
                            <input type="email"
                                   name="email"
                                   id="email"
                                   className="gui-input"
                                   placeholder="Email Address"
                                {...this.props.email}
                            />
                            <label htmlFor="email" className="field-icon">
                                <i className="fa fa-envelope-o" />
                            </label>
                        </label>
                        { this.errorDescription('email') }
                    </div>
                </div>

                <div className="section row">
                    <div className="col-md-6 col-xs-12">
                        <label htmlFor="phone"
						   className={`field prepend-icon ${this.props.ajaxErrors.phone ? 'state-error': ''}`}
                        >
                            <input type="text"
                                   name="phone"
                                   id="phone"
                                   className="gui-input"
                                   placeholder="Contact Number"
                                {...this.props.phone}
                            />
                            <label htmlFor="phone" className="field-icon">
                                <i className="fa fa-phone" />
                            </label>
                        </label>
                        { this.errorDescription('phone') }
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <label htmlFor="address"
						   className={`field prepend-icon ${this.props.ajaxErrors.address ? 'state-error': ''}`}
                        >
                            <input type="text"
                                   name="address"
                                   id="address"
                                   className="gui-input"
                                   placeholder="Address"
                                {...this.props.address}
                            />
                            <label htmlFor="address" className="field-icon">
                                <i className="fa fa-globe" />
                            </label>
                        </label>
                        { this.errorDescription('address') }
                    </div>
                </div>

            </section>
        )
    }
}
