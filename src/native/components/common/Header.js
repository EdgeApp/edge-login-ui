import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from '../common'
import * as Colors from '../../../common/constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

// Make a component
class Header extends Component {
  render () {
    const Style = this.props.style
    return (
      <LinearGradient
        style={Style.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={Colors.GRADIENT}
      >
        <View style={Style.left}>
          {this.renderBack(Style)}
        </View>
        {this.renderText(Style)}
        <View style={Style.right}>
          {this.renderSkip(Style)}
        </View>
      </LinearGradient>
    )
  }
  renderBack (style) {
    if (!this.props.showBackButton) {
      return
    }
    let label = 'BACK'
    if (this.props.useCancel) {
      label = 'CANCEL' // TODO localize
    }
    return (
      <Button
        onPress={this.onBack.bind(this)}
        downStyle={style.textButton.downStyle}
        downTextStyle={style.textButton.downTextStyle}
        upStyle={style.textButton.upStyle}
        upTextStyle={style.textButton.upTextStyle}
        label={label}
      />
    )
  }
  renderText (style) {
    return (
      <View style={style.center}>
        <Text style={style.subHeadText}>{this.props.subTitle}</Text>
        <Text style={style.headlineText}>{this.props.title}</Text>
      </View>
    )
  }
  renderSkip (style) {
    if (!this.props.showSkipButton) {
      return
    }
    return (
      <Button
        onPress={this.onSkip.bind(this)}
        downStyle={style.textButton.downStyle}
        downTextStyle={style.textButton.downTextStyle}
        upStyle={style.textButton.upStyle}
        upTextStyle={style.textButton.upTextStyle}
        label={'SKIP'}
      />
    )
  }
  onSkip () {
    this.props.skipScreen()
  }
  onBack () {
    this.props.goBack()
  }
}

export { Header }
