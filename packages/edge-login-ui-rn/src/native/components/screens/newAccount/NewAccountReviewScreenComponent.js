// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button, WarningBox } from '../../common'
import AccountInfoContainer from '../../../connectors/abSpecific/AccountInfoConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
// import * as Constants from '../../../common/constants'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  styles: Object,
  nextScreen(): void
}
export default class NewAccountReviewScreenComponent extends Component<Props> {
  render () {
    const { NewAccountReviewScreenStyle } = this.props.styles
    return (
      <SafeAreaView>
        <View style={NewAccountReviewScreenStyle.screen}>
          <HeaderConnector style={NewAccountReviewScreenStyle.header} />
          <View style={NewAccountReviewScreenStyle.pageContainer}>
            <View style={NewAccountReviewScreenStyle.instructionsContainer}>
              <Text style={NewAccountReviewScreenStyle.instructionsText}>
                Almost done! Let&apos;s write down your account information
              </Text>
            </View>
            <View style={NewAccountReviewScreenStyle.warningBoxContainer}>
              <WarningBox
                style={NewAccountReviewScreenStyle.warningBox}
                message={
                  'If you lose your account information, you’ll lose access to your funds permanently. Write down and store it securely.'
                } // TODO localize
              />
            </View>
            <View style={NewAccountReviewScreenStyle.shim} />
            <View style={NewAccountReviewScreenStyle.detailsContainer}>
              <AccountInfoContainer
                style={NewAccountReviewScreenStyle.accountDetailsBox}
              />
              <View style={NewAccountReviewScreenStyle.shim} />
            </View>

            <Button
              onPress={this.onNextPress}
              downStyle={NewAccountReviewScreenStyle.nextButton.downStyle}
              downTextStyle={
                NewAccountReviewScreenStyle.nextButton.downTextStyle
              }
              upStyle={NewAccountReviewScreenStyle.nextButton.upStyle}
              upTextStyle={NewAccountReviewScreenStyle.nextButton.upTextStyle}
              label={'Done'}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
  onNextPress = () => {
    this.props.nextScreen()
  }
}
