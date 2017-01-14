import React, { Component } from 'react'

import Header from './Header/Header'
import Menu from './Menu/Menu'
import Content from './Content/Content'
import Alert from './Alert/Alert'
import ServerMaintenance from './Server/ServerMaintenance'
import Socket from '../socket/Socket'

class Container extends Component {
    render() {
		return (
				<div>
					<Header />	
					<Menu />
					<Content children={this.props.children}></Content>
					<Alert />
					<Socket />
					<ServerMaintenance />
				</div>
		   )
	}
}

export default Container
