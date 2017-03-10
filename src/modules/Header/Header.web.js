import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link'
import AppBar from 'react-toolbox/lib/app_bar';
import styles from './Header.webStyle'

const actions = [

]

class Header extends Component {

  render () {
    return (
    <AppBar title="Sample App" leftIcon='menu' fixed="true">
        <Navigation type="horizontal" actions={actions} style={{width: "100%"}}>
            <Link href="#" className="headerAppName"style={{float: "left"}} label="App Name" />
            <Link href="#" className="headerPoweredAirBitz" style={{float: "right"}} label="Powered by AirBitz" />
        </Navigation>
    </AppBar>
    )
  }
}

export default connect(state => ({

}))(Header)