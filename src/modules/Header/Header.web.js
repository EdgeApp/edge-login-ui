import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Header.webStyle.scss'
import { sprintf } from 'sprintf-js'
import t from 'lib/web/LocaleStrings'

class Header extends Component {

  componentWillMount () {
    try {
      const vendorName = window.parent.abcuiContext.vendorName || 'Sample App'
      this.props.vendorName = vendorName
    } catch (e) {
      console.log('Error with finding vendorName: ', e)
    }
  }

  render () {
    return (
      <div className={styles.container}>
        <p className={styles.text}>
          {sprintf(t('fragment_setup_header_left'), this.props.vendorName)}
        </p>
      </div>
    )
  }
}

export default connect()(Header)
