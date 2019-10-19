import React from 'react'

import styles from '../styles/GlobalInputs.scss'

export default ({ items, onClick, close, selected }) => {
  return (
    <div className={styles.dropdownContainer}>
      {items.map((item, index) => {
        return (
          <div
            className={
              selected === item.value ? styles.rowSelected : styles.row
            }
            key={index}
          >
            <div
              className={styles.textContainer}
              onClick={() => {
                onClick(item.value)
                close()
              }}
            >
              <p className={styles.text}>{item.label}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
