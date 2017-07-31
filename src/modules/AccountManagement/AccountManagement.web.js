import React, { Component } from 'react'
// import { connect } from 'react-redux'

import styles from './AccountManagement.webStyle.scss'
// import t from 'lib/web/LocaleStrings'

class AccountManager extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Account name: AirbitzAugur</p>
      </div>
    )
  }
}

export default AccountManager
