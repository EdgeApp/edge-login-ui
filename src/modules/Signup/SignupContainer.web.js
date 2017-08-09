import React, { Component } from 'react'
import { connect } from 'react-redux'

import Username from '../Username/Username.web.new.js'
import PinNumber from '../PinNumber/PinNumber.web.new.js'
import Password from '../Password/Password.web'
import ReviewDetails from '../ReviewDetails/ReviewDetails.web'

class Container extends Component {
  render () {
    switch (this.props.page) {
      case 'username':
        return <Username />
      case 'pin' :
        return <PinNumber />
      case 'password' :
        return <Password />
      case 'review' :
        return <ReviewDetails />
      default:
        return <Username />
    }
  }
}

export default connect(state => ({
  page: state.signupPage
}))(Container)
