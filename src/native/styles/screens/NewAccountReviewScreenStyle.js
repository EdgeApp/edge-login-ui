// @flow

import * as Constants from '../../../common/constants/'
import { scale } from '../../../common/util/scaling'
import * as Styles from '../'

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

export { NewAccountReviewScreenStyle }
