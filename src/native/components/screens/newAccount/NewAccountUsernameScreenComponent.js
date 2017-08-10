import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../../common'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    const { NewAccountUsernameScreenStyle } = this.props.styles
    return (
      <View style={NewAccountUsernameScreenStyle.screen}>
        <View style={NewAccountUsernameScreenStyle.header} />
        <View style={NewAccountUsernameScreenStyle.pageContainer}>
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={NewAccountUsernameScreenStyle.nextButton.downStyle}
            downTextStyle={
              NewAccountUsernameScreenStyle.nextButton.downTextStyle
            }
            upStyle={NewAccountUsernameScreenStyle.nextButton.upStyle}
            upTextStyle={NewAccountUsernameScreenStyle.nextButton.upTextStyle}
            label={'NEXT'}
          />
        </View>
      </View>
    )
  }
  onNextPress () {
    this.props.validateUsername('Bob20')
  }
}
