import React from 'react'
import {connect} from 'react-redux'

class Header extends React.Component {

    render() {
        return (
            <header className="navbar navbar-fixed-top bg-dark">
                <div className="navbar-branding">
                    <a className="navbar-brand" href="dashboard.html">
                        <b>Made to Burst</b>
                    </a>
                </div>
            </header>
        )
    }
}

export default connect(
	state => ({
			profile : state.user.profile
		})
)(Header)
