import React from 'react'

import Footer from './Footer/Footer.js'
import Header from './Header/Header.js'
import styles from './Layout.scss'

export default ({ location, children }) => (
  <div className={styles.container}>
    <Header location={location} />
    <div className={styles.main}>{children}</div>
    <Footer />
  </div>
)
