import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Footer.webStyle'
import t from 'lib/web/LocaleStrings'

class Footer extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <a href='https://airbitz.co/app' target='_blank' className={styles.text}>{t('fragment_setup_footer_1') + t('fragment_setup_footer_2_link')}</a>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left} />
          <div className={styles.spacer} />
          <p className={styles.right}>
            Powered by <a href='https://airbitz.co/app' target='_blank' className={styles.airbitzLink}>Airbitz</a>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(state => ({

}))(Footer)
