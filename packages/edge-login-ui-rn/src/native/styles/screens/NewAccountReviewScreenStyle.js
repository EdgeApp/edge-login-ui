// @flow

import * as Styles from '../'
import * as Constants from '../../../common/constants/'

const NewAccountReviewScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  instructionsContainer: {
    height: 80,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: 16,
    color: Constants.GRAY_1,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    textAlign: 'center'
  },
  shim: { ...Styles.Shim, height: 10 },
  warningBoxContainer: {
    height: 80,
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
      paddingTop: 5,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    bottom: {
      flex: 9,
      borderColor: Constants.ACCENT_RED,
      borderWidth: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    text: {
      fontSize: Constants.FONTS.defaultFontSize,
      textAlign: 'center',
      fontFamily: Constants.FONTS.fontFamilyRegular,
      color: Constants.GRAY_1
    },
    iconWrapBottom: {
      position: 'relative',
      borderRadius: 27,
      backgroundColor: Constants.WHITE,
      height: 30,
      width: 30
    },
    iconWrapTop: {
      position: 'relative',
      top: 1,
      left: 1,
      borderRadius: 27,
      backgroundColor: Constants.WHITE,
      zIndex: 100,
      elevation: 100,
      height: 28,
      width: 28,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    iconSize: 24,
    iconStyle: {
      marginTop: 10,
      color: Constants.ACCENT_RED,
      backgroundColor: Constants.TRANSPARENT
    }
  },
  detailsContainer: {
    height: 220,
    width: '80%'
  },
  accountDetailsBox: {
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'column'
    },
    textIconButton: {
      ...Styles.TextAndIconButtonStyle,
      text: {
        ...Styles.TextAndIconButtonStyle.text,
        fontSize: Constants.FONTS.defaultFontSize + 2,
        color: Constants.SECONDARY
      },
      textPressed: {
        ...Styles.TextAndIconButtonStyle.text,
        fontSize: Constants.FONTS.defaultFontSize + 2,
        color: Constants.SECONDARY
      },
      icon: {
        ...Styles.TextAndIconButtonStyle.icon,
        color: Constants.SECONDARY
      }
    },
    top: {
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: Constants.GRAY_4,
      height: Constants.BUTTON_HEIGHT
    },
    shim: { ...Styles.Shim, height: 5, backgroundColor: Constants.TRANSPARENT },
    bottom: {
      width: '100%',
      flexDirection: 'column'
    },
    bottomInfo: {
      width: '100%',
      minHeight: 60,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: Constants.GRAY_4
    },
    bRow: {
      width: '100%',
      flexDirection: 'row',
      paddingRight: 25,
      paddingVertical: 4
    },
    bInfoLeft: {
      flex: 2
    },
    bInfoCenter: {
      flex: 3
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
      fontSize: Constants.FONTS.defaultFontSize + 1,
      color: Constants.GRAY_1
    },
    bottomWarningText: {
      fontSize: Constants.FONTS.defaultFontSize,
      fontFamily: Constants.FONTS.fontFamilyRegular,
      color: Constants.ACCENT_RED,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 15
    }
  },
  nextButton: {
    upStyle: { ...Styles.PrimaryButtonUpStyle, width: '80%' },
    downStyle: { ...Styles.PrimaryButtonDownStyle, width: '80%' },
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle
  }
}

export { NewAccountReviewScreenStyle }
