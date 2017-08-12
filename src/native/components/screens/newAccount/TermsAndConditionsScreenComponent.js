import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../../common'
// import * as Constants from '../../../common/constants'

export default class TermsAndConditionsScreenComponent extends Component {
  render () {
    const { NewAccountReviewScreenStyle } = this.props.styles
    return (
      <View style={NewAccountReviewScreenStyle.screen}>
        <View style={NewAccountReviewScreenStyle.row1} />
        <View style={NewAccountReviewScreenStyle.row2} />
        <View style={NewAccountReviewScreenStyle.row3} />
        <View style={NewAccountReviewScreenStyle.row4} />
        <View style={NewAccountReviewScreenStyle.row5} />
        <View style={NewAccountReviewScreenStyle.row6}>
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={NewAccountReviewScreenStyle.nextButton.downStyle}
            downTextStyle={
              NewAccountReviewScreenStyle.nextButton.downTextStyle
            }
            upStyle={NewAccountReviewScreenStyle.nextButton.upStyle}
            upTextStyle={NewAccountReviewScreenStyle.nextButton.upTextStyle}
            label={'DONE'}
          />
        </View>

      </View>
    )
  }
  onNextPress () {
    this.props.agreeToCondition(this.props.accountObject)
  }
}
