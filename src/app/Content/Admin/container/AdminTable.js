import React, {Component} from 'react'
import { connect } from 'react-redux'
import { selectAdmin } from '../action/action'

import  Table from '../component/Table'

class AdminTable extends Component {

    handleClick = (id) => {
        this.props.dispatch(selectAdmin(id))
    }

    render() {

		const rows = this.props.admins.map ((admin, index) => {
				return (
						<tr 
							className={`default-row-hover ${this.props.profile && this.props.profile._id  == admin._id ? 'default-row-active' : ''}`}
							key={index}
							value={admin.id}
							onClick={this.handleClick.bind(null, admin._id)}
						>
							<td>{admin.name.first} {admin.name.last}</td>
							<td>{admin.groups[Object.keys(admin.groups)[0]]}</td>
						</tr>
				)
			})

        return <Table rows={rows} loader={this.props.loader}/>
    }
}

export default connect( state => ({ 
	admins 	: state.admin.list,
	loader : state.admin.loader.table,
	profile : state.admin.selected ? 
		state.admin.list.find(admin => admin._id == state.admin.selected) : 
		null	
}))(AdminTable)
