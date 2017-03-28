import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link'
import AppBar from 'react-toolbox/lib/app_bar'
import styles from './Footer.webStyle'
import t from 'lib/web/LocaleStrings'

class Footer extends Component {
  render () {
    return (
      <AppBar title='Footer' className={styles.appBar} flat={false} style={styles.footer}>
        <Navigation type='horizontal' className={styles.navigation}>
          <Link href='https://airbitz.co/app' target='_blank' className={styles.footerDownloadLink} label={t('fragment_setup_footer_1') + t('fragment_setup_footer_2_link')} icon='' />
        </Navigation>
      </AppBar>
    )
  }
}

export default connect(state => ({

}))(Footer)
