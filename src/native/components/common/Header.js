import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from '../common'

// Make a component
class Header extends Component {
  render () {
    const Style = this.props.style
    return (
      <View style={Style.container}>
        <View style={Style.left}>
          {this.renderBack(Style)}
        </View>
        {this.renderText(Style)}
        <View style={Style.right}>
          {this.renderSkip(Style)}
        </View>
      </View>
    )
  }
  renderBack (style) {
    if (!this.props.showBackButton) {
      return
    }
    return (
      <Button
        onPress={this.onBack.bind(this)}
        downStyle={style.textButton.downStyle}
        downTextStyle={style.textButton.downTextStyle}
        upStyle={style.textButton.upStyle}
        upTextStyle={style.textButton.upTextStyle}
        label={'BACK'}
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
