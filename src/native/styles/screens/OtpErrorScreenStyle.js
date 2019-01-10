// @flow

import * as Constants from '../../../common/constants/'
import * as Styles from '../'

const OtpErrorScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: {
    ...Styles.HeaderContainerScaledStyle
  },
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  hero: {
    container: {
      position: 'relative',
      width: '100%'
    },
    colorField: {
      position: 'relative',
      width: '100%',
      height: 100,
      backgroundColor: Constants.GRAY_3,
      flexDirection: 'row',
      paddingTop: 20
    },
    leftField: {
      flex: 2,
      paddingRight: 10,
      paddingTop: 2,
      alignItems: 'flex-end'
    },
    rightField: {
      flex: 8
    },
    heroTitleText: {
      color: Constants.PRIMARY,
      fontSize: 17
    },
    heroText: {
      color: Constants.GRAY_1,
      fontSize: 14,
      marginTop: 7
    },
    orOption: {
      position: 'relative',
      height: 100,
      width: '100%',
      backgroundColor: Constants.WHITE
    },
    orRow: {
      height: 48,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    instructionsRow: {
      height: 52
    },
    instructionsText: {
      width: '90%',
      textAlign: 'center',
      marginLeft: '5%',
      marginRight: '5%',
      color: Constants.GRAY_1
    },
    shim: { ...Styles.Shim, height: 20 }
  },
  shim: { ...Styles.Shim, height: 20 },
  qrRow: {
    position: 'relative',
    width: '100%',
    height: 150
  },
  exitButton: {
    upStyle: { ...Styles.TextOnlyButtonUpStyle, width: null },
    upTextStyle: Styles.TextOnlyButtonTextUpStyle,
    downTextStyle: Styles.TextOnlyButtonTextDownStyle,
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: 15,
    textAlign: 'center'
  },
  modalMiddle: {
    position: 'relative',
    width: '100%'
  },
  modalInput: {
    ...Styles.MaterialInputOnWhite,
    container: {
      ...Styles.MaterialInputOnWhite.container,
      width: '100%'
    }
  }
}

export { OtpErrorScreenStyle }
