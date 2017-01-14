import React,{Component} from 'react'
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
									Player Username
                                </h2>
                                <h3 className="media-heading">
									Player Name
                                </h3>
                                <h4>email: </h4>
                                <h4>level: </h4>
                                <h4>xp: </h4>
                                <h4>Total Deposits: </h4>
                                <h4>Deposit Address: </h4>
                                <h4>Withdraw Address: </h4>
                                <h4>Total Withdraw: </h4>
                                <h4>Balance </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
