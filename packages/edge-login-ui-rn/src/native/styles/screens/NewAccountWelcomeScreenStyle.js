// @flow

import * as Constants from '../../../common/constants/'
import { scale } from '../../../common/util/scaling.js'
import * as Styles from '../'

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

export { NewAccountWelcomeScreenStyle }
