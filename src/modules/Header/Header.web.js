import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {

  render () {
    return (
    <nav className="navbar navbar-inverse navbar-fixed-top" >
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">[App Name] Login</span>
                    </button>
                    <a className="navbar-brand" to="#">[App Name] Login</a>
                </div>                       
            <ul class="nav navbar-nav navbar-right">
              <li class="active">
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