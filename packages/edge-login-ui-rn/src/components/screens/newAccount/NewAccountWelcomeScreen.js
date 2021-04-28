// @flow

import * as React from 'react'
import { View } from 'react-native'
import { sprintf } from 'sprintf-js'

import * as Assets from '../../../assets/index.js'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Branding } from '../../../types/Branding.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { ImageHeaderComponent } from '../../abSpecific/ImageHeaderComponent'
import { Button } from '../../common/Button.js'
import T from '../../common/FormattedText.js'
import { HeaderBackButton } from '../../common/HeaderBackButton.js'
import SafeAreaView from '../../common/SafeAreaView.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {
  branding: Branding
}
type DispatchProps = {
  onBack(): void,
  onDone(): void
}
type Props = OwnProps & DispatchProps

type State = {}

class NewAccountWelcomeScreenComponent extends React.Component<Props, State> {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.screen}>
          <View style={styles.row1}>
            <HeaderBackButton
              testID="exitButton"
              onPress={this.props.onBack}
              styles={styles.exitBackButtonStyle}
              label={s.strings.exit}
            />
          </View>
          <View style={styles.row2}>
            <ImageHeaderComponent src={Assets.WELCOME} />
          </View>
          <View style={styles.row3}>
            <T style={styles.instructionsText}>
              {sprintf(
                s.strings.welcome_one,
                this.props.branding.appName || s.strings.app_name_default
              )}
            </T>
          </View>
          <View style={styles.row4} />
          <View style={styles.row5}>
            <T style={styles.callToAction}>{s.strings.start_username}</T>
          </View>
          <View style={styles.row6}>
            <Button
              testID="getStartedButton"
              onPress={this.props.onDone}
              downStyle={styles.nextButton.downStyle}
              downTextStyle={styles.nextButton.downTextStyle}
              upStyle={styles.nextButton.upStyle}
              upTextStyle={styles.nextButton.upTextStyle}
              label={s.strings.get_started}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = {
  screen: { ...Styles.ScreenStyle },
  row1: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  row2: { width: '100%', flex: 4 },
  row3: { width: '100%', flex: 3 },
  row4: { width: '100%', flex: 3 },
  row5: { width: '100%', flex: 1 },
  row6: {
    width: '100%',
    flex: 3,
    alignItems: 'center'
  },
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
      fontSize: scale(22),
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
    onBack() {
      dispatch({ type: 'START_LANDING' })
    },
    onDone() {
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Welcome_Next`)
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(NewAccountWelcomeScreenComponent)
