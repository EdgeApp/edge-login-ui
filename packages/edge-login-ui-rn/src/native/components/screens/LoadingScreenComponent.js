import React, { Component } from 'react'
import { Spinner } from '../common'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    const { CenteredSpinnerStyle } = this.props.styles
    return <Spinner style={CenteredSpinnerStyle} />
  }
}
