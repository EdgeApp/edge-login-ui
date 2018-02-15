import Header from '../Header/Header.web'
import Footer from '../Footer/Footer.web'
import React, {Component} from 'react'

class LayoutTemplate extends Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer className='dialogFooter' />
      </div>
    )
  }
}

export default LayoutTemplate
