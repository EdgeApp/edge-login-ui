import React, { Component } from 'react'
import { connect } from 'react-redux'

import Username from '../Username/Username.web.new.js'
import PinNumber from '../PinNumber/PinNumber.web.new.js'
import Password from '../Password/Password.web.new.js'
import ReviewDetails from '../ReviewDetails/ReviewDetails.web'

class Container extends Component {
  render () {
    switch (this.props.page) {
      case 'username':
        return <Username {...this.props} />
      case 'pin' :
        return <PinNumber {...this.props} />
      case 'password' :
        return <Password {...this.props} />
      case 'review' :
        return <ReviewDetails {...this.props} />
      default:
        return <Username {...this.props} />
    }
  }
}

export default connect(state => ({
  page: state.signupPage
}))(Container)
