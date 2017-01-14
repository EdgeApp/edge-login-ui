import React, { Component } from 'react'

class Container extends Component {
    render() {
		console.log(this.props)
		return (
			<div className="app">
				{this.props.children}	
			</div>
	   )
	}
}

export default Container
