import React,{Component} from 'react'
import moment from 'moment'

export default class Profile extends Component {

    render() {
        return (
            <div className="panel panel-primary panel-border top">

                <div className="panel-heading" style={{height: '43px'}}>
                    <button 
						className="btn btn-primary btn-xs ml10"
                        onClick={ this.props.handleAddOperator }
					>
                        <span className="fa fa-plus"></span>  Add Operator
                    </button>

                    <button 
						className="btn btn-info btn-xs ml10"
						disabled={ this.props.profile._id ? false : true}
                        onClick={ this.props.handleEditOperatorAccount }
					>
                        <span className="fa fa-pencil"></span>  Edit Operator
					</button>

                    <button 
						className="btn btn-warning btn-xs ml10"
						disabled={ this.props.profile._id ? false : true}
                        onClick={ this.props.handleEditOperatorUser }
					>
                        <span className="fa fa-pencil"></span>  Edit Credentials
					</button>

                    <button 
						className="btn btn-danger btn-xs ml10"
						disabled={ this.props.profile._id ? false : true}
                        onClick={ this.props.handleDeleteOperator }
					>
                        <span className="fa fa-trash"></span>  Delete Operator
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
									{this.props.profile.name.first} {this.props.profile.name.last}
                                </h2>
                                <h3 className="media-heading">
									{this.props.profile.company}
                                </h3>
                                <h4><div className="glyphicon glyphicon-user"> :</div> {this.props.profile.details.position || 'N/A'} </h4>
                                <h4><div className="glyphicon glyphicon-phone"> :</div> {this.props.profile.details.phone || 'N/A'} </h4>
                                <h4><div className="glyphicon glyphicon-envelope"> :</div>{this.props.profile.details.email || 'N/A'}</h4>
                                <h4><div className="glyphicon glyphicon-globe"> :</div>{this.props.profile.details.address || 'N/A'}</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
