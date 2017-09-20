import Header from '../Header/Header.mobile'
import Footer from '../Footer/Footer.mobile'
import React, {Component} from 'react'
import styles from './LayoutTemplate.webStyle.scss'

class LayoutTemplate extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Header location={this.props.location} />
        <div className={styles.main}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default LayoutTemplate
