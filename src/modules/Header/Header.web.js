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
    <AppBar title="Sample App" leftIcon='menu' fixed={true} className={styles.appBar}>
        <Navigation type="horizontal" actions={actions} className={styles.navigation}>
            <Link className={styles.headerAppName} label="App Name" />
            <Link className={styles.headerPoweredAirBitz} label="Powered by Airbitz" />
        </Navigation>
    </AppBar>
    )
  }
}

export default connect(state => ({

}))(Header)