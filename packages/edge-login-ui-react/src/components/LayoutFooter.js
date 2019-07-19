import React from 'react'

import logo from '../img/edge-logo-blue.svg'
import t from '../lib/LocaleStrings.js'
import styles from '../styles/LayoutFooter.scss'

export default () => (
  <section>
    <div className={styles.container}>
      <p className={styles.text}>{`${t('footer_text')} `}</p>
      <a href="https://edge.app/" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Edge Logo" className={styles.image} />
      </a>
    </div>
  </section>
)
