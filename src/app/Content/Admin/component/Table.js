import React,{Component} from 'react'

export default class TableContent extends Component {
    render() {
		return (
			<div className="panel default-table-panel">
				<div className="panel-heading">
					<span className="panel-title">
					<span className="fa fa-user" />Administrators</span>
				</div>
				<div className="panel-body pn">
					<div className="bs-component">
						<Content rows={this.props.rows} loader={this.props.loader}/>
					</div>
				</div>
			</div>
		)
    }
}

class Content extends Component {
	render() {
	
		if(this.props.loader){
			return (
				<p className="text-center table-spinner">
					<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
					<br />
					<span style={{fontSize: 18}}>Loading</span>
				</p>                    
			)	
		}
	
		if(!this.props.loader){
			return (
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Group</th>
						</tr>
					</thead>
					<tbody>
						{this.props.rows}
					</tbody>
				</table>
			)	
		}

	}
}
