import React,{Component} from 'react'

export default class Profile extends Component {

    render() {
        return (
            <div className="panel panel-primary panel-border top">
                <div className="panel-heading" style={{height: '43px'}}>
                    <button className="btn btn-primary btn-xs ml10"
                            onClick={ this.props.handleAddAdmin }
					>
                        <span className="fa fa-plus"></span>  Add Admin
                    </button>

                    <button className="btn btn-info btn-xs ml10" disabled>
                        <span className="fa fa-pencil"></span>  Edit Admin
					</button>
				
                    <button className="btn btn-info btn-xs ml10" disabled>
                        <span className="fa fa-pencil"></span>  Edit Group
					</button>

                    <button className="btn btn-warning btn-xs ml10" disabled>
                        <span className="fa fa-pencil"></span>  Edit Credentials
					</button>

                    <button className="btn btn-danger btn-xs ml10" disabled>
                        <span className="fa fa-trash"></span>  Delete Admin
                    </button>

                </div>
                <div className="panel-body profile">
                    <div className="panel">

                        <div className="media clearfix">
                            <div className="media-left pr30">
                                <img className="media-object mw150" src="assets/img/no-profile.jpg" alt="..." />
                            </div>
                            <div className="media-body va-m">
                                <h2 className="media-heading">
									Admin Name
                                </h2>
                                <h3 className="media-heading">
									Admin Group
                                </h3>
								<br/>
								<br/>
                                <h4><div className="glyphicon glyphicon-envelope"> :</div></h4>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
