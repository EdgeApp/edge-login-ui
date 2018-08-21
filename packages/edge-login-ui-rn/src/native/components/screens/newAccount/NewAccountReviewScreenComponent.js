// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import s from '../../../../common/locales/strings'
import AccountInfoContainer from '../../../connectors/abSpecific/AccountInfoConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import { Button, WarningBox } from '../../common'
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
                {s.strings.almost_done}
              </Text>
            </View>
            <View style={NewAccountReviewScreenStyle.warningBoxContainer}>
              <WarningBox
                style={NewAccountReviewScreenStyle.warningBox}
                message={s.strings.warning_message}
              />
            </View>
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
              label={s.strings.next_label}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
  onNextPress = () => {
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Review_Next`)
    this.props.nextScreen()
  }
}
