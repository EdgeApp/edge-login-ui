// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { sprintf } from 'sprintf-js'

import * as Assets from '../../../assets/index.js'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { ImageHeaderComponent } from '../../abSpecific/ImageHeaderComponent'
import { Button } from '../../common/Button.js'
import T from '../../common/FormattedText.js'
import { HeaderBackButton } from '../../common/HeaderBackButton.js'
import SafeAreaView from '../../common/SafeAreaView.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {
  appName: string
}
type DispatchProps = {
  exitScreen(): void,
  nextScreen(): void
}
type Props = OwnProps & DispatchProps

type State = {}

class NewAccountWelcomeScreenComponent extends Component<Props, State> {
  render() {
    return (
      <SafeAreaView>
        <View style={NewAccountWelcomeScreenStyle.screen}>
          <View style={NewAccountWelcomeScreenStyle.row1}>
            <HeaderBackButton
              onPress={this.props.exitScreen}
              styles={NewAccountWelcomeScreenStyle.exitBackButtonStyle}
              label={s.strings.exit}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row2}>
            <ImageHeaderComponent
              style={NewAccountWelcomeScreenStyle.logoHeader}
              src={Assets.WELCOME}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row3}>
            <T style={NewAccountWelcomeScreenStyle.instructionsText}>
              {sprintf(
                s.strings.welcome_one,
                this.props.appName || s.strings.app_name_default
              )}
            </T>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row4} />
          <View style={NewAccountWelcomeScreenStyle.row5}>
            <T style={NewAccountWelcomeScreenStyle.callToAction}>
              {s.strings.start_username}
            </T>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row6}>
            <Button
              onPress={this.props.nextScreen}
              downStyle={NewAccountWelcomeScreenStyle.nextButton.downStyle}
              downTextStyle={
                NewAccountWelcomeScreenStyle.nextButton.downTextStyle
              }
              upStyle={NewAccountWelcomeScreenStyle.nextButton.upStyle}
              upTextStyle={NewAccountWelcomeScreenStyle.nextButton.upTextStyle}
              label={s.strings.get_started}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const NewAccountWelcomeScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  row1: {
    ...Styles.ScreenRow,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  row2: { ...Styles.ScreenRow, flex: 4 },
  row3: { ...Styles.ScreenRow, flex: 3 },
  row4: { ...Styles.ScreenRow, flex: 3 },
  row5: { ...Styles.ScreenRow, flex: 1 },
  row6: {
    ...Styles.ScreenRow,
    flex: 3,
    alignItems: 'center'
  },
  logoHeader: Styles.LogoHeaderScaledStyle,
  instructionsText: {
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_2,
    textAlign: 'center',
    paddingLeft: scale(20),
    paddingRight: scale(20)
  },
  callToAction: {
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_2,
    textAlign: 'center'
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  },
  exitButton: {
    upStyle: { ...Styles.TextOnlyButtonUpScaledStyle, width: null },
    upTextStyle: Styles.TextOnlyButtonTextUpScaledStyle,
    downTextStyle: Styles.TextOnlyButtonTextDownScaledStyle,
    downStyle: Styles.TextOnlyButtonDownScaledStyle
  },
  exitBackButtonStyle: {
    backButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    backIconStyle: {
      paddingLeft: scale(10),
      paddingRight: scale(5),
      fontSize: scale(20),
      color: Constants.SECONDARY
    },
    sideText: {
      color: Constants.SECONDARY,
      fontSize: scale(18)
    },
    icon: {
      color: Constants.SECONDARY
    },
    default: {
      backgroundColor: Constants.TRANSPARENT,
      color: Constants.SECONDARY
    }
  }
}

export const NewAccountWelcomeScreen = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    exitScreen() {
      dispatch({ type: 'WORKFLOW_START', data: 'initalizeWF' })
    },
    nextScreen() {
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Welcome_Next`)
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(NewAccountWelcomeScreenComponent)
