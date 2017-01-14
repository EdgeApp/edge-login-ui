import React,{Component} from 'react'

export default class Personal extends Component {

    shouldComponentUpdate(nextProps) {
        return  this.props.email 		!== nextProps.email ||
				this.props.group 		!== nextProps.group ||
            	this.props.ajaxErrors   !== nextProps.ajaxErrors;
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
                    <div className="col-md-6 col-xs-12">
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
					<div className="col-md-6 col-xs-12">
						<label className={`field select ${this.props.ajaxErrors.group ? 'state-error': ''}`}>
							<select name="group"
									id="group"
									{...this.props.group}
							>
								<option value="Root">Root</option>
								<option value="Administrator">Administrator</option>
								<option value="Moderator">Moderator</option>
							</select>
							<i className="arrow"></i>
						</label>
						{ this.errorDescription('group') }
				   </div>
                </div>

            </section>
        )
    }
}
