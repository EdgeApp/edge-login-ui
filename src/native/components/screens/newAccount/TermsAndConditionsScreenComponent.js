import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Button } from '../../common'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnector'
// import * as Constants from '../../../common/constants'

export default class TermsAndConditionsScreenComponent extends Component {
  renderItems () {
    console.log()
  }
  render () {
    const { TermsAndConditionsScreenStyle } = this.props.styles
    return (
      <View style={TermsAndConditionsScreenStyle.screen}>
        <HeaderConnector style={TermsAndConditionsScreenStyle.header} />
        <ScrollView
          contentContainerStyle={TermsAndConditionsScreenStyle.pageContainer}
        >
          <View style={TermsAndConditionsScreenStyle.instructions}>
            <Text>Msd</Text>
          </View>
          {this.renderItems()}
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={TermsAndConditionsScreenStyle.nextButton.downStyle}
            downTextStyle={
              TermsAndConditionsScreenStyle.nextButton.downTextStyle
            }
            upStyle={TermsAndConditionsScreenStyle.nextButton.upStyle}
            upTextStyle={TermsAndConditionsScreenStyle.nextButton.upTextStyle}
            label={'DONE'}
          />
        </ScrollView>
      </View>
    )
  }
  onNextPress () {
    this.props.agreeToCondition(this.props.accountObject)
  }
}
