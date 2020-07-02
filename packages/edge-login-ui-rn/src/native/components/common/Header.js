// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import s from '../../../common/locales/strings'
import T from '../../../native/components/common/FormattedText.js'
import { Button, HeaderBackButton } from '../common'

const UPPER_LEFT = { x: 0, y: 0 }
const UPPER_RIGHT = { x: 1, y: 0 }
const GRADIENT = ['#0E4B75', '#0D2145']

export type HeaderOwnProps = {
  colors?: string[],
  title?: string
}

type StateProps = {
  style: Object,
  subTitle: string,
  title: string,
  showBackButton: boolean,
  showSkipButton?: boolean,
  customLabel?: string,
  skipScreen(): void,
  goBack(): void,
  useCancel(): void,
  skipButton(): void
}
type Props = HeaderOwnProps & StateProps

// Make a component
class Header extends Component<Props> {
  render() {
    const Style = this.props.style
    return (
      <LinearGradient
        style={[Style.container, { paddingTop: 0 }]}
        start={UPPER_LEFT}
        end={UPPER_RIGHT}
        colors={this.props.colors || GRADIENT}
      >
        <View style={Style.left}>{this.renderBack(Style)}</View>
        {this.renderText(Style)}
        <View style={Style.right}>{this.renderSkip(Style)}</View>
      </LinearGradient>
    )
  }

  renderBack(style: Object) {
    if (!this.props.showBackButton) {
      return
    }
    let label = s.strings.back
    if (this.props.useCancel) {
      label = s.strings.cancel_caps
    }
    if (this.props.customLabel) {
      label = this.props.customLabel
    }
    return (
      <HeaderBackButton
        onPress={this.onBack}
        styles={style.headerBackButtonStyle}
        label={label}
      />
    )
  }

  renderText(style: Object) {
    return (
      <View style={style.center}>
        {this.props.subTitle !== '' && (
          <T style={style.subHeadText}>{this.props.subTitle}</T>
        )}
        <T style={style.headlineText}>{this.props.title}</T>
      </View>
    )
  }

  renderSkip(style: Object) {
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
        label={s.strings.skip}
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
