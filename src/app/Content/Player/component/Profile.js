import React,{Component} from 'react'
import moment from 'moment'
import Buttons from './ProfileButtons'

export default class Profile extends Component {

    render() {

        return (
            <div className="panel panel-primary panel-border top">

				<Buttons { ...this.props } />

                <div className="panel-body profile">
                    <div className="panel">
                        <div className="media clearfix">
                            <div className="media-left pr30">
                                <img className="media-object mw150" src="assets/img/no-profile.jpg" alt="..." />
                            </div>
                            <div className="media-body va-m">
                                <h2 className="media-heading">
									{this.props.profile.user ? this.props.profile.user.name : null}
                                </h2>
                                <h3 className="media-heading">
									{this.props.profile.name}
                                </h3>
                                <h4>email: {this.props.profile.user ? this.props.profile.user.email : null} </h4>
                                <h4>level: {this.props.profile.level} </h4>
                                <h4>xp: {this.props.profile.xp} </h4>
                                <h4>Total Deposits: </h4>
                                <h4>Deposit Address: </h4>
                                <h4>Withdraw Address: </h4>
                                <h4>Total Withdraw: </h4>
                                <h4>Balance </h4>
                            </div>
                        </div>
                    </div>

					<div className="section row">
						<div className="col-xs-12">
							<h3>Status</h3>
							<div className="panel-body">
								<ul className="list-styled">
									{ this.props.profile.isMuted ? <li>Muted</li> : null }
									{ this.props.profile.isIgnored ? <li>Ignored</li> : null }
									{ this.props.profile.isDisabled ? <li>Disabled</li> : null }
									{ this.props.profile.isBanned ? <li>Banned</li> : null }
								</ul>
							</div>
						</div>
					</div>
					
                </div>

            </div>
        )
    }
}
