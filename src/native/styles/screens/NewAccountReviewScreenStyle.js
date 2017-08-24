import * as Styles from '../'
import { vs, fontSize } from '../../../common/util'
import * as Colors from '../../../common/constants/Colors'

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
      width: '80%'
    },
    top: {
      flex: 1
    },
    bottom: {
      flex: 9,
      borderColor: Colors.ACCENT_RED,
      borderWidth: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    text: {
      fontSize: fontSize(10),
      textAlign: 'center'
    }
  },
  detailsContainer: {
    height: vs(180),
    width: '80%'
  },
  accountDetailsBox: {
    container: {
      flex: 1,
      width: '100%'
    },
    top: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: Colors.GRAY_3
    },
    bottom: {
      flex: 6,
      alignItems: 'center'
    },
    bottomInfo: {
      width: '80%',
      flex: 1,
      justifyContent: 'space-around'
    },
    bottomWarning: {
      width: '80%',
      flex: 2
    },
    accountText: {
      fontSize: fontSize(12),
      color: Colors.PRIMARY
    },
    bottomWarningText: {
      fontSize: fontSize(10),
      color: Colors.ACCENT_RED
    }
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  }
}

export { NewAccountReviewScreenStyle }
