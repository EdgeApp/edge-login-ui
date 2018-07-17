import React from 'react'

import styles from './Layout.scss'

export default ({ location, children }) => (
  <div className={styles.container}>
    <div className={styles.main}>{children}</div>
  </div>
)
