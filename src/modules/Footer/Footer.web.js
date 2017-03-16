import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link'
import AppBar from 'react-toolbox/lib/app_bar';
import styles from './Footer.webStyle'

const actions = [

]

class Footer extends Component {

  render () {
    return (
    <AppBar title="Footer" className={styles.appBar} flat={false} style={styles.footer}>
        <Navigation type="horizontal" actions={actions} className={styles.navigation}>
            <Link href="https://airbitz.co/app" target="_blank" className={styles.footerDownloadLink} label="Increase your account security. Download Airbitz" icon="" />
        </Navigation>
    </AppBar>
    )
  }
}

export default connect(state => ({

}))(Footer)