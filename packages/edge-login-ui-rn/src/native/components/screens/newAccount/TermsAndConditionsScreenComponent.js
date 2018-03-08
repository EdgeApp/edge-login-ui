// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button, Checkbox } from '../../common'
import { REVIEW_CHECKED, REVIEW_UNCHECKED } from '../../../assets/'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import type { AbcAccount } from 'edge-login'

type Props = {
  styles: Object,
  accountObject: AbcAccount,
  terms: Object,
  agreeToCondition(AbcAccount): void
}
type State = {
  totalChecks: number
}
export default class TermsAndConditionsScreenComponent extends Component<
  Props,
  State
> {
  componentWillMount () {
    this.setState({
      totalChecks: 0
    })
  }
  renderItems (style: Object) {
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
  renderInstructions (style: Object) {
    if (this.state.totalChecks < 3) {
      return (
        <View style={style.instructionsContainer}>
          <Text style={style.instructionsText}>
            Last step! Let’s finish with a quick review
          </Text>
        </View>
      )
    }
    return <View style={style.instructionsSubShim} />
  }
  renderButton (style: Object) {
    if (this.state.totalChecks === 3) {
      return (
        <View style={style.buttonContainer}>
          <Text style={style.agreeText}>
            I have read, understood, and agree to the Terms of Use
          </Text>
          <View style={style.shim} />
          <Button
            onPress={this.onNextPress}
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
  changeStatus (event: any) {
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
      <SafeAreaView>
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
      </SafeAreaView>
    )
  }
  onNextPress = () => {
    this.props.agreeToCondition(this.props.accountObject)
  }
}
