// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import s from '../../../../common/locales/strings'
import * as Assets from '../../../assets'
import T from '../../../components/common/FormattedText.js'
import { ImageHeaderComponent } from '../../abSpecific/ImageHeaderComponent'
import { Button, HeaderBackButton } from '../../common'
import SafeAreaView from '../../common/SafeAreaView.js'

type Props = {
  styles: Object,
  nextScreen(): void,
  exitScreen(): void
}

type State = {}
export default class NewAccountWelcomeScreenComponent extends Component<
  Props,
  State
> {
  render () {
    const { NewAccountWelcomeScreenStyle } = this.props.styles

    return (
      <SafeAreaView>
        <View style={NewAccountWelcomeScreenStyle.screen}>
          <View style={NewAccountWelcomeScreenStyle.row1}>
            <HeaderBackButton
              onPress={this.props.exitScreen}
              styles={NewAccountWelcomeScreenStyle.exitBackButtonStyle}
              label={s.strings.exit}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row2}>
            <ImageHeaderComponent
              style={NewAccountWelcomeScreenStyle.logoHeader}
              src={Assets.WELCOME}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row3}>
            <T style={NewAccountWelcomeScreenStyle.instructionsText}>
              {s.strings.welcome_one}
            </T>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row4} />
          <View style={NewAccountWelcomeScreenStyle.row5}>
            <T style={NewAccountWelcomeScreenStyle.callToAction}>
              {s.strings.start_username}
            </T>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row6}>
            <Button
              onPress={this.props.nextScreen}
              downStyle={NewAccountWelcomeScreenStyle.nextButton.downStyle}
              downTextStyle={
                NewAccountWelcomeScreenStyle.nextButton.downTextStyle
              }
              upStyle={NewAccountWelcomeScreenStyle.nextButton.upStyle}
              upTextStyle={NewAccountWelcomeScreenStyle.nextButton.upTextStyle}
              label={s.strings.get_started}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
  /* onNextPress () {
    this.props.nextScreen()
  }* /
  /* onExitPress = () =>  {
    this.props.exitScreen()
  } */
}
