// @flow

import * as Constants from '../../../common/constants/'
import { MultiLineTextCheckBox } from '../../../common/styles/common/CheckboxStyles'
import * as Styles from '../'

const TermsAndConditionsScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  instructionsContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: Styles.CreateAccountFont.headerFontSize,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  instructionsSubShim: {
    height: 20
  },
  agreeText: {
    fontSize: Styles.CreateAccountFont.defaultFontSize,
    textAlign: 'center',
    paddingHorizontal: 50,
    marginBottom: 20,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  midSection: {
    height: 250
  },
  buttonContainer: {
    height: 100,
    alignItems: 'center'
  },
  checkboxContainer: {
    width: '80%',
    marginBottom: 20
  },
  shim: { ...Styles.Shim, height: 10 },
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
