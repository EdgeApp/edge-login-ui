import Header from '../Header/Header.web'
import Footer from '../Footer/Footer.web'
import React, {Component} from 'react'
import layoutTheme from 'theme/layoutTheme.scss'

class LayoutTemplate extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <Header />
                {this.props.children}
                <Footer className="dialogFooter" />                
            </div>
        )
    }
}

export default LayoutTemplate