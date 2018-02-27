// @flow
import React, { Component } from 'react'
import { Spinner } from '../common'

type Props = {
  styles: Object
}

export default class LandingScreenComponent extends Component<Props> {
  render () {
    const { CenteredSpinnerStyle } = this.props.styles
    return <Spinner style={CenteredSpinnerStyle} />
  }
}
