import t from 'lib/web/LocaleStrings'
import React from 'react'

import logo from '../../../img/global/logo_edge_white.png'
import styles from './Footer.webStyle'

export default () => (
  <div className={styles.container}>
    <div className={styles.main}>
      <div className={styles.left}>
        <img src={logo} />
      </div>
      <div className={styles.mid}>
        <p className={styles.text}>
          <a
            href="https://airbitz.co/app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('fragment_setup_footer_1') + t('fragment_setup_footer_2_link')}
          </a>
        </p>
      </div>
      <p className={styles.right}>
        Powered by{' '}
        <a
          href="https://airbitz.co/app"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.airbitzLink}
        >
          Edge
        </a>
      </p>
    </div>
  </div>
)
