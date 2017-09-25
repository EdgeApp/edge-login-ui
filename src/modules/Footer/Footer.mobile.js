import React, { Component } from 'react'
import styles from './Footer.mobileStyle.scss'
// import t from 'lib/web/LocaleStrings'

export default class Footer extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.text1Container}>
          <p className={styles.text1}>
            Increase your Account Security. <br />
            Download Airbitz & enable 2FA
          </p>
        </div>
        <div className={styles.text2Container}>
          <p className={styles.text2}>
            Powered by <a href='https://airbitz.co/app' target='_blank' className={styles.link}>Airbitz</a>
          </p>
        </div>
      </div>
    )
  }
}
