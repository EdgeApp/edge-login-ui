import React from 'react'

import styles from '../styles/Layout.scss'
import Footer from './LayoutFooter.js'
import Header from './LayoutHeader.js'

export default ({ location, children }) => (
  <div className={styles.container}>
    <Header location={location} />
    <div className={styles.main}>{children}</div>
    <Footer />
  </div>
)
