// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import s from '../../../../common/locales/strings'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector.js'
import { Spinner } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  styles: Object
}
export class CreatingAccountWaitScreen extends Component<Props> {
  render() {
    const { CreatingAccountWaitScreenStyle } = this.props.styles
    return (
      <SafeAreaView>
        <View style={CreatingAccountWaitScreenStyle.container}>
          <HeaderConnector style={CreatingAccountWaitScreenStyle.header} />
          <View style={CreatingAccountWaitScreenStyle.pageContainer}>
            <View style={CreatingAccountWaitScreenStyle.topPad} />
            <View style={CreatingAccountWaitScreenStyle.iconContianer}>
              <Spinner />
            </View>
            <View style={CreatingAccountWaitScreenStyle.headlineConainer}>
              <Text style={CreatingAccountWaitScreenStyle.headlineText}>
                {s.strings.good_job}
              </Text>
            </View>
            <View style={CreatingAccountWaitScreenStyle.bodyCopyContainer}>
              <Text style={CreatingAccountWaitScreenStyle.bodyText}>
                {s.strings.hang_tight}
              </Text>
              <Text style={CreatingAccountWaitScreenStyle.bodyText}>
                {s.strings.secure_account}
              </Text>
            </View>
            <View style={CreatingAccountWaitScreenStyle.encriptingContainer}>
              <Text style={CreatingAccountWaitScreenStyle.bodyText}>
                {s.strings.encrypting_wallet}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
