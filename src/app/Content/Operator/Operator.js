import React, {Component} from 'react'
import { connect } from 'react-redux'

import OperatorTable from './container/OperatorTable'
import OperatorDetail from './container/OperatorDetail'
import OperatorAdd from './container/OperatorAdd'
import OperatorDelete from './container/OperatorDelete'
import OperatorEditUser from './container/OperatorEditUser'
import OperatorEditAccount from './container/OperatorEditAccount'

class Operator extends Component {

    render() {
        return (
            <section id="department">
                <div className="col-md-5">
                    <OperatorTable />
                </div>
                <div className="col-md-7">
                    <OperatorDetail/>
                </div>
				<OperatorAdd />
				<OperatorDelete />
				<OperatorEditUser />
				<OperatorEditAccount />
            </section>
        )
    }
}

export default connect()(Operator)
