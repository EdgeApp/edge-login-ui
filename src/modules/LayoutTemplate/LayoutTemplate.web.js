import Header from '../Header/Header.web'
//import Footer from '../Footer/Footer.web'
import React, {Component} from 'react'

class LayoutTemplate extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <Header />
                {this.props.children}
            </div>
        )
    }
}

export default LayoutTemplate