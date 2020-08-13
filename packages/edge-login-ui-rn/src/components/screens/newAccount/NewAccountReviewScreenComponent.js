// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import s from '../../../common/locales/strings.js'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { AccountInfo } from '../../abSpecific/AccountInfoComponent.js'
import { Button } from '../../common/Button.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { WarningBox } from '../../common/WarningBox.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {}
type DispatchProps = {
  nextScreen(): void
}
type Props = OwnProps & DispatchProps

class NewAccountReviewScreenComponent extends Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <View style={NewAccountReviewScreenStyle.screen}>
          <HeaderConnector style={NewAccountReviewScreenStyle.header} />
          <View style={NewAccountReviewScreenStyle.pageContainer}>
            <View style={NewAccountReviewScreenStyle.instructionsContainer}>
              <Text style={NewAccountReviewScreenStyle.instructionsText}>
                {s.strings.almost_done}
              </Text>
            </View>
            <View style={NewAccountReviewScreenStyle.warningBoxContainer}>
              <WarningBox
                style={NewAccountReviewScreenStyle.warningBox}
                message={s.strings.warning_message}
              />
            </View>
            <View style={NewAccountReviewScreenStyle.detailsContainer}>
              <AccountInfo
                style={NewAccountReviewScreenStyle.accountDetailsBox}
              />
              <View style={NewAccountReviewScreenStyle.shim} />
            </View>
            <Button
              onPress={this.onNextPress}
              downStyle={NewAccountReviewScreenStyle.nextButton.downStyle}
              downTextStyle={
                NewAccountReviewScreenStyle.nextButton.downTextStyle
              }
              upStyle={NewAccountReviewScreenStyle.nextButton.upStyle}
              upTextStyle={NewAccountReviewScreenStyle.nextButton.upTextStyle}
              label={s.strings.next_label}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  onNextPress = () => {
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Review_Next`)
    this.props.nextScreen()
  }
}

const NewAccountReviewScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerScaledStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
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
    ...Styles.Shim,
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
  accountDetailsBox: {
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'column'
    },
    textIconButton: {
      ...Styles.TextAndIconButtonScaledStyle,
      text: {
        ...Styles.TextAndIconButtonScaledStyle.text,
        fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
        color: Constants.SECONDARY
      },
      textPressed: {
        ...Styles.TextAndIconButtonScaledStyle.text,
        fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
        color: Constants.SECONDARY
      },
      icon: {
        ...Styles.TextAndIconButtonScaledStyle.icon,
        color: Constants.SECONDARY
      }
    },
    top: {
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: Constants.GRAY_4,
      height: scale(Constants.BUTTON_HEIGHT)
    },
    shim: {
      ...Styles.Shim,
      height: scale(5),
      backgroundColor: Constants.TRANSPARENT
    },
    bottom: {
      width: '100%',
      flexDirection: 'column'
    },
    bottomInfo: {
      width: '100%',
      minHeight: scale(60),
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: Constants.GRAY_4
    },
    bRow: {
      width: '100%',
      flexDirection: 'row',
      paddingRight: scale(25),
      paddingVertical: scale(4)
    },
    bInfoLeft: {
      flex: 2
    },
    bInfoCenter: {
      flex: 3.5,
      flexWrap: 'nowrap'
    },
    bInforRight: {
      flex: 5
    },
    bottomWarning: {
      width: '100%',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: Constants.GRAY_4
    },
    accountText: {
      fontSize: scale(13),
      color: Constants.GRAY_1
    },
    bottomWarningText: {
      fontSize: scale(Constants.FONTS.defaultFontSize),
      fontFamily: Constants.FONTS.fontFamilyRegular,
      color: Constants.ACCENT_RED,
      paddingLeft: scale(15),
      paddingRight: scale(15),
      paddingBottom: scale(15)
    }
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
    nextScreen() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(NewAccountReviewScreenComponent)
