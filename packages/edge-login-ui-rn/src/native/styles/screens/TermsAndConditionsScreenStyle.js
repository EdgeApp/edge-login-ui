// @flow

import * as Constants from '../../../common/constants/'
import { MultiLineTextCheckBox } from '../../../common/styles/common/CheckboxStyles'
import { scale } from '../../../common/util/scaling'
import * as Styles from '../'

const TermsAndConditionsScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerScaledStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  instructionsContainer: {
    height: scale(100),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: scale(Styles.CreateAccountFont.headerFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    paddingHorizontal: scale(30),
    textAlign: 'center'
  },
  instructionsSubShim: {
    height: scale(20)
  },
  agreeText: {
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    textAlign: 'center',
    paddingHorizontal: scale(50),
    marginBottom: scale(20),
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  midSection: {
    height: scale(250)
  },
  buttonContainer: {
    height: scale(100),
    alignItems: 'center'
  },
  checkboxContainer: {
    width: '80%',
    marginBottom: scale(20)
  },
  shim: { ...Styles.Shim, height: scale(10) },
  checkboxes: MultiLineTextCheckBox,
  nextButton: {
    upStyle: { ...Styles.PrimaryButtonUpStyle, width: 240 },
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: { ...Styles.PrimaryButtonDownStyle, width: 240 }
  },
  termsButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: Constants.FONTS.defaultFontSize
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: Constants.FONTS.defaultFontSize
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  inputShim: { ...Styles.Shim, height: 20 }
}

export { TermsAndConditionsScreenStyle }
