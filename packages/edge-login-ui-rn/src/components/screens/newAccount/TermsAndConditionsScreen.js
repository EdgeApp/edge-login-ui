// @flow

import type { EdgeAccount } from 'edge-core-js'
import React, { Component } from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { sprintf } from 'sprintf-js'

import { agreeToConditions } from '../../../actions/CreateAccountActions.js'
import { REVIEW_CHECKED, REVIEW_UNCHECKED } from '../../../assets/index.js'
import s from '../../../common/locales/strings.js'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { Button } from '../../common/Button.js'
import { Checkbox } from '../../common/Checkbox.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {
  appName: string
}
type StateProps = {
  accountObject: EdgeAccount,
  terms: Object
}
type DispatchProps = {
  agreeToCondition(account: EdgeAccount): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  totalChecks: number
}

class TermsAndConditionsScreenComponent extends Component<Props, State> {
  scrollView: any
  constructor(props: Props) {
    super(props)
    this.state = {
      totalChecks: 0
    }
  }

  renderItems(style: typeof TermsAndConditionsScreenStyle) {
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

  renderInstructions(style: typeof TermsAndConditionsScreenStyle) {
    return (
      <View style={style.instructionsContainer}>
        <Text style={style.instructionsText}>{s.strings.last_step_review}</Text>
      </View>
    )
  }

  renderButton(style: typeof TermsAndConditionsScreenStyle) {
    if (this.state.totalChecks === 4) {
      setTimeout(() => {
        this.scrollView.scrollToEnd({ animated: true })
      }, 50)
      return (
        <View style={style.buttonContainer}>
          <Text
            style={style.agreeText}
            onPress={() =>
              Linking.openURL('https://edge.app/terms-of-service/')
            }
          >
            {s.strings.read_understod_1}
            <Text style={style.agreeTextLink}>
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
    return (
      <SafeAreaView>
        <View style={TermsAndConditionsScreenStyle.screen}>
          <HeaderConnector style={TermsAndConditionsScreenStyle.header} />
          <View style={TermsAndConditionsScreenStyle.pageContainer}>
            <ScrollView ref={ref => (this.scrollView = ref)}>
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

const TermsAndConditionsScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerScaledStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  instructionsContainer: {
    height: scale(100),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: scale(Styles.CreateAccountFont.headerFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    paddingHorizontal: scale(30),
    textAlign: 'center'
  },
  instructionsSubShim: {
    height: scale(20)
  },
  agreeText: {
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    textAlign: 'center',
    paddingHorizontal: scale(50),
    marginBottom: scale(20),
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  agreeTextLink: {
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    textAlign: 'center',
    paddingHorizontal: scale(50),
    marginBottom: scale(20),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.SECONDARY
  },
  midSection: {
    paddingBottom: scale(20)
  },
  buttonContainer: {
    height: scale(150),
    alignItems: 'center'
  },
  checkboxContainer: {
    width: '80%',
    marginBottom: scale(20)
  },
  shim: { ...Styles.Shim, height: scale(10) },
  checkboxes: Styles.MultiLineTextCheckBoxScaled,
  nextButton: {
    upStyle: { ...Styles.PrimaryButtonUpScaledStyle, width: scale(240) },
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: { ...Styles.PrimaryButtonDownScaledStyle, width: scale(240) }
  },
  termsButton: {
    upStyle: Styles.TextOnlyButtonUpScaledStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpScaledStyle,
      fontSize: scale(Constants.FONTS.defaultFontSize)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownScaledStyle,
      fontSize: scale(Constants.FONTS.defaultFontSize)
    },
    downStyle: Styles.TextOnlyButtonDownScaledStyle
  },
  inputShim: { ...Styles.Shim, height: scale(20) }
}

export const TermsAndConditionsScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    accountObject: state.create.accountObject,
    terms: state.terms
  }),
  (dispatch: Dispatch) => ({
    agreeToCondition(data: EdgeAccount) {
      dispatch(agreeToConditions(data))
    }
  })
)(TermsAndConditionsScreenComponent)
