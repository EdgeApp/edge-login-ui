// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, HeaderBackButton } from '../common'
import * as Colors from '../../../common/constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  style: Object,
  subTitle: string,
  title: string,
  showBackButton: boolean,
  skipScreen(): void,
  goBack(): void
}
// Make a component
class Header extends Component<Props> {
  render () {
    const Style = this.props.style
    return (
      <LinearGradient
        style={Style.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={Colors.GRADIENT}
      >
        <View style={Style.left}>{this.renderBack(Style)}</View>
        {this.renderText(Style)}
        <View style={Style.right}>{this.renderSkip(Style)}</View>
      </LinearGradient>
    )
  }
  renderBack (style: Object) {
    if (!this.props.showBackButton) {
      return
    }
    let label = 'BACK'
    if (this.props.useCancel) {
      label = 'CANCEL' // TODO localize
    }
    return (
      <HeaderBackButton
        onPress={this.onBack}
        styles={style.headerBackButtonStyle}
        label={label}
      />
    )
  }
  renderText (style: Object) {
    return (
      <View style={style.center}>
        <Text style={style.subHeadText}>{this.props.subTitle}</Text>
        <Text style={style.headlineText}>{this.props.title}</Text>
      </View>
    )
  }
  renderSkip (style: Object) {
    if (!this.props.showSkipButton) {
      return
    }
    return (
      <Button
        onPress={this.onSkip}
        downStyle={style.textButton.downStyle}
        downTextStyle={style.textButton.downTextStyle}
        upStyle={style.textButton.upStyle}
        upTextStyle={style.textButton.upTextStyle}
        label={'SKIP'}
      />
    )
  }
  onSkip = () => {
    this.props.skipScreen()
  }
  onBack = () => {
    this.props.goBack()
  }
}

export { Header }
