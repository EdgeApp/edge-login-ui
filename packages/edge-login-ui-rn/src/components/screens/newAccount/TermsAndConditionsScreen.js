// @flow

import * as React from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { sprintf } from 'sprintf-js'

import { agreeToConditions } from '../../../actions/CreateAccountActions.js'
import { REVIEW_CHECKED, REVIEW_UNCHECKED } from '../../../assets/index.js'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Branding } from '../../../types/Branding.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { Button } from '../../common/Button.js'
import { Checkbox } from '../../common/Checkbox.js'
import { Header } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {
  branding: Branding
}
type StateProps = {}
type DispatchProps = {
  agreeToCondition(): void,
  onBack(): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  totalChecks: number
}

class TermsAndConditionsScreenComponent extends React.Component<Props, State> {
  scrollView: any
  constructor(props: Props) {
    super(props)
    this.state = {
      totalChecks: 0
    }
  }

  renderItems() {
    const { branding } = this.props
    const { appName = s.strings.app_name_default } = branding
    const terms: string[] = [
      sprintf(s.strings.terms_one, appName),
      s.strings.terms_two,
      sprintf(s.strings.terms_three, appName),
      sprintf(s.strings.terms_four, appName)
    ]
    return terms.map(title => (
      <View style={styles.checkboxContainer} key={title}>
        <Checkbox
          testID="termsCB"
          style={styles.checkboxes}
          label={title}
          onChange={this.handleStatusChange}
          defaultValue={false}
          checkedImage={REVIEW_CHECKED}
          uncheckedImage={REVIEW_UNCHECKED}
          key={title}
        />
      </View>
    ))
  }

  renderInstructions() {
    return (
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          {s.strings.last_step_review}
        </Text>
      </View>
    )
  }

  renderButton() {
    if (this.state.totalChecks === 4) {
      setTimeout(() => {
        this.scrollView.scrollToEnd({ animated: true })
      }, 50)
      return (
        <View style={styles.buttonContainer}>
          <Text
            style={styles.agreeText}
            onPress={() =>
              Linking.openURL('https://edge.app/terms-of-service/')
            }
          >
            {s.strings.read_understod_1}
            <Text style={styles.agreeTextLink}>
              {s.strings.read_understod_2}
            </Text>
          </Text>
          <View style={styles.shim} />
          <Button
            testID="confirmAndFinishButton"
            onPress={this.handleNextPress}
            downStyle={styles.nextButton.downStyle}
            downTextStyle={styles.nextButton.downTextStyle}
            upStyle={styles.nextButton.upStyle}
            upTextStyle={styles.nextButton.upTextStyle}
            label={s.strings.confirm_finish}
          />
        </View>
      )
    }
    return null
  }

  handleStatusChange = (event: any) => {
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
        <View style={styles.screen}>
          <Header onBack={this.props.onBack} />
          <View style={styles.pageContainer}>
            <ScrollView ref={ref => (this.scrollView = ref)}>
              {this.renderInstructions()}
              <View style={styles.midSection}>{this.renderItems()}</View>
              {this.renderButton()}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  handleNextPress = () => {
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Terms_Agree`)
    this.props.agreeToCondition()
  }
}

const styles = {
  screen: { ...Styles.ScreenStyle },
  pageContainer: {
    flex: 1,
    width: '100%',
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
  shim: { width: '100%', height: scale(10) },
  checkboxes: {
    container: {
      position: 'relative',
      width: '100%',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    },
    text: {
      fontSize: scale(Constants.FONTS.defaultFontSize + 2),
      color: Constants.GRAY_2,
      fontFamily: Constants.FONTS.fontFamilyRegular
    },
    checkbox: {
      position: 'relative',
      height: '100%',
      padding: scale(10),
      justifyContent: 'flex-start'
    },
    labelContainer: {}
  },
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
  inputShim: { width: '100%', height: scale(20) }
}

export const TermsAndConditionsScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    agreeToCondition() {
      dispatch(agreeToConditions())
    },
    onBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    }
  })
)(TermsAndConditionsScreenComponent)
