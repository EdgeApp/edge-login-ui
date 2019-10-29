import React, { Component } from 'react'

import Password from '../connectors/SignupPassword.connector'
import PinNumber from '../connectors/SignupPinNumber.connector'
import ReviewDetails from '../connectors/SignupReviewDetails.connector'
import Username from '../connectors/SignupUsername.connector'

export default class Signup extends Component {
  render() {
    switch (this.props.page) {
      case 'username':
        return <Username {...this.props} />
      case 'pin':
        return <PinNumber {...this.props} />
      case 'password':
        return <Password {...this.props} />
      case 'review':
        return <ReviewDetails {...this.props} />
      default:
        return <Username {...this.props} />
    }
  }
}
