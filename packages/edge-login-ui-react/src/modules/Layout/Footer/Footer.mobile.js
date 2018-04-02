import React from 'react'

import logo from '../../../img/global/logo_edge_white.png'
import styles from './Footer.mobileStyle.scss'

export default () => (
  <div className={styles.container}>
    <div className={styles.text1Container}>
      <p className={styles.text1}>
        <a
          href="https://airbitz.co/app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Increase your Account Security. <br />
          Download Edge & enable 2FA
        </a>
      </p>
    </div>
    <div className={styles.text2Container}>
      <img src={logo} />
      <p className={styles.text2}>
        Powered by{' '}
        <a
          href="https://airbitz.co/app"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Edge
        </a>
      </p>
    </div>
  </div>
)
