import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button, Checkbox } from '../../common'
// import {  } from '../../common/Checkbox'
import { REVIEW_CHECKED, REVIEW_UNCHECKED } from '../../../assets/'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnector'
// import * as Constants from '../../../common/constants'

export default class TermsAndConditionsScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      totalChecks: 0
    })
  }
  renderItems (style) {
    return this.props.terms.items.map(Item => (
      <View style={style.checkboxContainer} key={Item.title}>
        <Checkbox
          style={style.checkboxes}
          label={Item.title}
          onChange={this.changeStatus.bind(this)}
          defaultValue={false}
          checkedImage={REVIEW_CHECKED}
          uncheckedImage={REVIEW_UNCHECKED}
          key={Item.title}
        />
      </View>
    ))
  }
  renderInstructions (style) {
    if (this.state.totalChecks < 3) {
      return (
        <View style={style.instructionsContainer}>
          <Text style={style.instructionsText}>Last step! Let’s finish with a quick review</Text>
        </View>
      )
    }
    return <View style={style.instructionsSubShim} />
  }
  renderButton (style) {
    if (this.state.totalChecks === 3) {
      return (
        <View style={style.buttonContainer}>
          <Text style={style.agreeText}>I have read, understood, and agree to the Terms of Use</Text>
          <View style={style.shim} />
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={style.nextButton.downStyle}
            downTextStyle={style.nextButton.downTextStyle}
            upStyle={style.nextButton.upStyle}
            upTextStyle={style.nextButton.upTextStyle}
            label={'Confirm & Finish'}
          />
        </View>
      )
    }
    return null
  }
  changeStatus (event) {
    if (!event) {
      this.setState({
        totalChecks: this.state.totalChecks + 1
      })
    } else {
      this.setState({
        totalChecks: this.state.totalChecks - 1
      })
    }
  }
  render () {
    const { TermsAndConditionsScreenStyle } = this.props.styles
    return (
      <View style={TermsAndConditionsScreenStyle.screen}>
        <HeaderConnector style={TermsAndConditionsScreenStyle.header} />
        <View style={TermsAndConditionsScreenStyle.pageContainer}>
          {this.renderInstructions(TermsAndConditionsScreenStyle)}
          <View style={TermsAndConditionsScreenStyle.midSection}>
            {this.renderItems(TermsAndConditionsScreenStyle)}
          </View>
          {this.renderButton(TermsAndConditionsScreenStyle)}
        </View>
      </View>
    )
  }
  onNextPress () {
    this.props.agreeToCondition(this.props.accountObject)
  }
}
