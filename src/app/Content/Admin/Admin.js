import React, {Component} from 'react'
import { connect } from 'react-redux'

import AdminTable from './container/AdminTable'
import AdminDetail from './container/AdminDetail'
import AdminAdd from './container/AdminAdd'
import AdminDelete from './container/AdminDelete'

import { listAdmins } from './middleware/middleware'

class Admin extends Component {

    componentWillMount = () => {
        this.props.dispatch(listAdmins())
    }

    render() {
        return (
            <section id="admin">
                <div className="col-md-5">
                    <AdminTable />
                </div>
                <div className="col-md-7">
					<AdminDetail />
                </div>
				<AdminAdd />
				<AdminDelete />
            </section>
        )
    }
}

export default connect()(Admin)
