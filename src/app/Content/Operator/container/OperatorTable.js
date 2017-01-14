import React, {Component} from 'react'
import { connect } from 'react-redux'
import { selectOperator } from '../action/action'

import  Table from '../component/Table'

class OperatorTable extends Component {

    handleClick = (id) => {
        this.props.dispatch(selectOperator(id))
    }

    render() {

		const rows = this.props.operators.map ((operator, index) => {
				return (
						<tr 
							className={`employee-row-hover ${this.props.profile && this.props.profile._id  == operator._id ? 'employee-row-active' : ''}`}
							key={index}
							value={operator.id}
							onClick={this.handleClick.bind(null, operator._id)}
						>
							<td>{operator.name.first} {operator.name.last}</td>
							<td>{operator.company}</td>
						</tr>
				)
			})

        return <Table rows={rows} loader={this.props.loader}/>
    }
}

export default connect( state => ({ 
	operators 	: state.operator.list,
	loader : state.operator.loader.table,
	profile : state.operator.selected ? 
		state.operator.list.find(operator => operator._id == state.operator.selected) : 
		null	
}))(OperatorTable)
