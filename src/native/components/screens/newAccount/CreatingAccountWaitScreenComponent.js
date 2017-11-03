import React, { Component } from 'react'
import { View, Text } from 'react-native'
// import { LOGO_DOT } from '../../../../native/assets'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnector.js'
import { Spinner } from '../../common'
// import * as Constants from '../../../../common/constants'

export default class CreatingAccountWaitScreenComponent extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.createSuccess) {
      this.props.nextScreen()
    }
  }

  render () {
    const { CreatingAccountWaitScreenStyle } = this.props.styles
    return (
      <View style={CreatingAccountWaitScreenStyle.container}>
        <HeaderConnector style={CreatingAccountWaitScreenStyle.header} />
        <View style={CreatingAccountWaitScreenStyle.pageContainer}>
          <View style={CreatingAccountWaitScreenStyle.topPad} />
          <View style={CreatingAccountWaitScreenStyle.iconContianer}>
            <Spinner />
          </View>
          <View style={CreatingAccountWaitScreenStyle.headlineConainer}>
            <Text style={CreatingAccountWaitScreenStyle.headlineText}>Good job!</Text>
          </View>
          <View style={CreatingAccountWaitScreenStyle.bodyCopyContainer}>
            <Text style={CreatingAccountWaitScreenStyle.bodyText}>Hang tight while we create</Text>
            <Text style={CreatingAccountWaitScreenStyle.bodyText}>and secure your account</Text>
          </View>
          <View style={CreatingAccountWaitScreenStyle.encriptingContainer}>
            <Text style={CreatingAccountWaitScreenStyle.bodyText}>Encrypting wallet...</Text>
          </View>
        </View>
      </View>
    )
  }
}
