// @flow

import * as React from 'react'
import { Text, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { AccountInfo } from '../../abSpecific/AccountInfoComponent.js'
import { Button } from '../../common/Button.js'
import { Header } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {}
type DispatchProps = {
  onDone(): void
}
type Props = OwnProps & DispatchProps

class NewAccountReviewScreenComponent extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.screen}>
          <Header />
          <View style={styles.pageContainer}>
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsText}>
                {s.strings.almost_done}
              </Text>
            </View>
            <View style={styles.warningBoxContainer}>
              <View style={styles.warningBox.container}>
                <View style={styles.warningBox.bottom}>
                  <Text style={styles.warningBox.text}>
                    {s.strings.warning_message}
                  </Text>
                </View>
                <View style={styles.warningBox.top}>
                  <View style={styles.warningBox.iconWrapBottom}>
                    <EvilIcons
                      name="exclamation"
                      style={styles.warningBox.iconStyle}
                      size={styles.warningBox.iconSize}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <AccountInfo testID="accountInfoText" />
              <View style={styles.shim} />
            </View>
            <Button
              testID="nextButton"
              onPress={this.handleNext}
              downStyle={styles.nextButton.downStyle}
              downTextStyle={styles.nextButton.downTextStyle}
              upStyle={styles.nextButton.upStyle}
              upTextStyle={styles.nextButton.upTextStyle}
              label={s.strings.next_label}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  handleNext = () => {
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Review_Next`)
    this.props.onDone()
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
    height: scale(80),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: scale(Styles.CreateAccountFont.headerFontSize),
    color: Constants.GRAY_1,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    textAlign: 'center'
  },
  shim: {
    width: '100%',
    height: scale(10)
  },
  warningBoxContainer: {
    height: scale(90),
    width: '100%',
    alignItems: 'center'
  },
  warningBox: {
    container: {
      flex: 1,
      width: '80%',
      flexDirection: 'column-reverse'
    },
    top: {
      flex: 1,
      paddingTop: scale(8),
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    bottom: {
      flex: scale(9),
      borderColor: Constants.ACCENT_RED,
      borderWidth: 1,
      padding: scale(7),
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    text: {
      fontSize: scale(Constants.FONTS.defaultFontSize),
      textAlign: 'center',
      fontFamily: Constants.FONTS.fontFamilyRegular,
      color: Constants.GRAY_1
    },
    iconWrapBottom: {
      position: 'relative',
      borderRadius: 27,
      backgroundColor: Constants.WHITE,
      alignItems: 'center',
      height: scale(30),
      width: scale(30)
    },
    iconWrapTop: {
      position: 'relative',
      top: 1,
      left: 1,
      borderRadius: 27,
      backgroundColor: Constants.WHITE,
      zIndex: 100,
      elevation: 100,
      height: scale(28),
      width: scale(28),
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    iconSize: scale(24),
    iconStyle: {
      marginTop: scale(10),
      color: Constants.ACCENT_RED,
      backgroundColor: Constants.TRANSPARENT
    }
  },
  detailsContainer: {
    height: scale(220),
    width: '80%',
    marginTop: scale(20)
  },
  nextButton: {
    downTextStyle: Styles.PrimaryButtonDownTextScaledStyle,
    upStyle: { ...Styles.PrimaryButtonUpScaledStyle, width: '80%' },
    downStyle: { ...Styles.PrimaryButtonDownScaledStyle, width: '80%' },
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle
  }
}

export const NewAccountReviewScreen = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    onDone() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(NewAccountReviewScreenComponent)
