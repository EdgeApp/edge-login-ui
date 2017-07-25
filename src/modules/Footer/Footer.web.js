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
      <div className={styles.container}>
        {/* {t('fragment_setup_footer_1') + t('fragment_setup_footer_2_link')} */}
        <div className={styles.left}>
        </div>
        <div className={styles.spacer}>
        </div>
        <p className={styles.right}>
          Powered by <span style={{ fontWeight: 'bold' }}>Airbitz</span>
        </p>
      </div>
    )
  }
}

export default connect(state => ({

}))(Footer)
