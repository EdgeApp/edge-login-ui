// @flow

import * as Constants from '../../../common/constants/'
import { MultiLineTextCheckBoxScaled } from '../../../common/styles/common/CheckboxStyles'
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
    paddingBottom: scale(20)
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
  checkboxes: MultiLineTextCheckBoxScaled,
  nextButton: {
    upStyle: { ...Styles.PrimaryButtonUpScaledStyle, width: scale(240) },
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: { ...Styles.PrimaryButtonDownScaledStyle, width: scale(240) }
  },
  termsButton: {
    upStyle: Styles.TextOnlyButtonUpScaledStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpScaledStyle,
      fontSize: scale(Constants.FONTS.defaultFontSize)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownScaledStyle,
      fontSize: scale(Constants.FONTS.defaultFontSize)
    },
    downStyle: Styles.TextOnlyButtonDownScaledStyle
  },
  inputShim: { ...Styles.Shim, height: scale(20) }
}

export { TermsAndConditionsScreenStyle }
