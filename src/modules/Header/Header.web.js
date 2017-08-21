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
  _renderheader = (pathname) => {
    switch (pathname) {
      case '/changepin':
        return 'Change your 4-digit PIN'
      case '/changepassword':
        return 'Change your password'
      default:
        return sprintf(t('fragment_setup_header_left'), this.props.vendorName)
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.text}>
          {this._renderheader(this.props.location.pathname)}
        </p>
      </div>
    )
  }
}

export default connect()(Header)
