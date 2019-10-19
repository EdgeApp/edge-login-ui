import React from 'react'

import styles from '../styles/LayoutHeader.scss'

export default ({ location }) => {
  return (
    <section>
      <div className={styles.container}>
        <img src={window.abcui.vendorImageUrl} className={styles.icon} />
      </div>
    </section>
  )
}
