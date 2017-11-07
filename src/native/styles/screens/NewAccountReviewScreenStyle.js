import * as Styles from '../'
import { vs, fontSize } from '../../../common/util'
import * as Constants from '../../../common/constants/'

const NewAccountReviewScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  instructionsContainer: {
    height: vs(80),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: fontSize(14),
    textAlign: 'center'
  },
  shim: { ...Styles.Shim, height: 10 },
  warningBoxContainer: {
    height: vs(80),
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
      fontSize: fontSize(10),
      textAlign: 'center'
    },
    iconWrapBottom: {
      position: 'relative',
      borderRadius: 27,
      backgroundColor: Constants.ACCENT_RED,
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
      color: Constants.ACCENT_RED,
      backgroundColor: Constants.TRANSPARENT
    }
  },
  detailsContainer: {
    height: vs(180),
    width: '80%'
  },
  accountDetailsBox: {
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'column'
    },
    textIconButton: {...Styles.TextAndIconButtonStyle,
      text: {...Styles.TextAndIconButtonStyle.text,
        fontSize: Constants.DEFAULT_FONT_TEXT_SIZE + 2,
        color: Constants.BLACK
      },
      textPressed: {...Styles.TextAndIconButtonStyle.text,
        fontSize: Constants.DEFAULT_FONT_TEXT_SIZE + 2,
        color: Constants.GRAY_2
      },
      icon: {...Styles.TextAndIconButtonStyle.icon,
        color: Constants.BLACK
      }
    },
    top: {
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: Constants.GRAY_3,
      height: Constants.BUTTON_HEIGHT
    },
    shim: { ...Styles.Shim, height: 10, backgroundColor: Constants.TRANSPARENT },
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
      borderColor: Constants.GRAY_3
    },
    bRow: {
      width: '100%',
      height: 20,
      flexDirection: 'row'
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
      borderColor: Constants.GRAY_3
    },
    accountText: {
      fontSize: fontSize(12),
      color: Constants.PRIMARY
    },
    bottomWarningText: {
      fontSize: fontSize(10),
      color: Constants.ACCENT_RED,
      padding: 15
    }
  },
  nextButton: {
    upStyle: {...Styles.PrimaryButtonUpStyle, width: '80%'},
    downStyle: {...Styles.PrimaryButtonDownStyle, width: '80%'},
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle
  }
}

export { NewAccountReviewScreenStyle }
