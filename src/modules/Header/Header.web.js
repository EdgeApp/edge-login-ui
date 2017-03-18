import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link'
import AppBar from 'react-toolbox/lib/app_bar';
import styles from './Header.webStyle'

const actions = [

]

class Header extends Component {
  componentWillMount() {
    try{
      var vendorName = window.parent.abcuiContext.vendorName || 'Sample App'
      this.props.vendorName = vendorName
    }catch(e) {
      console.log('Error with finding vendorName: ', e)
    }
  }

  render () {
    return (
    <AppBar title="Sample App" leftIcon='menu' fixed={true} className={styles.appBar}>
        <Navigation type="horizontal" actions={actions} className={styles.navigation}>
            <Link className={styles.headerAppName} label={this.props.vendorName} />
            <Link className={styles.headerPoweredAirBitz} label="Powered by Airbitz" />
        </Navigation>
    </AppBar>
    )
  }
}

export default connect(state => ({

}))(Header)