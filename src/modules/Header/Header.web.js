import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Header.webStyle'

class Header extends Component {

  render () {
    return (
    <nav className={styles.abNav} >
        <div className={styles.abContainerFluid}>
            <div className={styles.abNavbarHeader}>
                <a className={styles.abNavbarBrand} to="#">[App Name] Login</a>
            </div>                       
        <ul className={styles.abNavbarNav}>
            <li className={styles.abNavbarRight}>
                <a href="#">Powered by AirBitz</a>
            </li>
        </ul>
        </div>
    </nav>
    )
  }
}


export default connect(state => ({

}))(Header)