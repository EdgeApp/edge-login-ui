import Header from '../Header/Header.web'
import Footer from '../Footer/Footer.web'
import React, {Component} from 'react'
import styles from './LayoutTemplate.webStyle.scss'

class LayoutTemplate extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          {this.props.children}
        </div>
        <Footer className='dialogFooter' />
      </div>
    )
  }
}

export default LayoutTemplate
