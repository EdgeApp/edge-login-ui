// @flow

import type { EdgeAccount } from 'edge-core-js'
import React, { Component } from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { sprintf } from 'sprintf-js'

import s from '../../../../common/locales/strings'
import { REVIEW_CHECKED, REVIEW_UNCHECKED } from '../../../assets/'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import { Button, Checkbox } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  styles: Object,
  accountObject: EdgeAccount,
  terms: Object,
  agreeToCondition(EdgeAccount): void,
  appName: string
}
type State = {
  totalChecks: number
}
export default class TermsAndConditionsScreenComponent extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = {
      totalChecks: 0
    }
  }

  renderItems(style: Object) {
    const terms = this.changeAppName()
    return terms.map(Item => (
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

  renderInstructions(style: Object) {
    return (
      <View style={style.instructionsContainer}>
        <Text style={style.instructionsText}>{s.strings.last_step_review}</Text>
      </View>
    )
  }

  renderButton(style: Object) {
    if (this.state.totalChecks === 4) {
      return (
        <View style={style.buttonContainer}>
          <Text style={style.agreeText}>
            {s.strings.read_understod_1}
            <Text
              style={style.agreeTextLink}
              onPress={() =>
                Linking.openURL('https://edge.app/terms-of-service/')
              }
            >
              {s.strings.read_understod_2}
            </Text>
          </Text>
          <View style={style.shim} />
          <Button
            onPress={this.onNextPress}
            downStyle={style.nextButton.downStyle}
            downTextStyle={style.nextButton.downTextStyle}
            upStyle={style.nextButton.upStyle}
            upTextStyle={style.nextButton.upTextStyle}
            label={s.strings.confirm_finish}
          />
        </View>
      )
    }
    return null
  }

  changeStatus(event: any) {
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

  render() {
    const { TermsAndConditionsScreenStyle } = this.props.styles
    return (
      <SafeAreaView>
        <View style={TermsAndConditionsScreenStyle.screen}>
          <HeaderConnector style={TermsAndConditionsScreenStyle.header} />
          <View style={TermsAndConditionsScreenStyle.pageContainer}>
            <ScrollView>
              {this.renderInstructions(TermsAndConditionsScreenStyle)}
              <View style={TermsAndConditionsScreenStyle.midSection}>
                {this.renderItems(TermsAndConditionsScreenStyle)}
              </View>
              {this.renderButton(TermsAndConditionsScreenStyle)}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  onNextPress = () => {
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Terms_Agree`)
    this.props.agreeToCondition(this.props.accountObject)
  }

  changeAppName = () => {
    const { terms, appName } = this.props
    if (appName) {
      return terms.items.map((item, index) => {
        if (index === 0) {
          return {
            title: sprintf(s.strings.terms_one, appName),
            value: item.value
          }
        }
        if (index === 1) {
          return item
        }
        if (index === 2) {
          return {
            title: sprintf(s.strings.terms_three, appName),
            value: item.value
          }
        }
        if (index === 3) {
          return {
            title: sprintf(s.strings.terms_four, appName),
            value: item.value
          }
        }
      })
    }
    return terms.items
  }
}
