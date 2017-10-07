import React, { Component } from 'react'
import { connect } from 'react-redux'

import Username from '../Username/Username.mobile.js'
import PinNumber from '../PinNumber/PinNumber.mobile.js'
import Password from '../Password/Password.mobile.js'
import ReviewDetails from '../ReviewDetails/ReviewDetails.mobile.js'

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
