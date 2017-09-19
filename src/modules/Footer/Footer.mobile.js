import React, { Component } from 'react'
import styles from './Footer.mobileStyle.scss'
// import t from 'lib/web/LocaleStrings'

export default class Footer extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <p className={styles.text}>
            Powered by <a href='https://airbitz.co/app' target='_blank' className={styles.link}>Airbitz</a>
          </p>
        </div>
      </div>
    )
  }
}
