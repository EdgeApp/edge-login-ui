import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Footer.webStyle'
import t from 'lib/web/LocaleStrings'

class Footer extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          {t('fragment_setup_footer_1') + t('fragment_setup_footer_2_link')}
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
          </div>
          <div className={styles.spacer}>
          </div>
          <p className={styles.right}>
            Powered by <span style={{ fontWeight: 'bold' }}>Airbitz</span>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(state => ({

}))(Footer)
