import React, { Component } from 'react'
import { View } from 'react-native'
import { Spinner } from '../../common'
// import * as Constants from '../../../../common/constants'

export default class CreatingAccountWaitScreenComponent extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if (nextProps.createSuccess) {
      this.props.nextScreen()
    }
  }

  render () {
    const { CreatingAccountWaitScreenStyle } = this.props.styles
    return (
      <View style={CreatingAccountWaitScreenStyle.container}>
        <Spinner style={CreatingAccountWaitScreenStyle.spinner} />
      </View>
    )
  }
}
