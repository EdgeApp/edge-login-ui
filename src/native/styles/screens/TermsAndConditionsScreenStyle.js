import * as Styles from '../'
import * as Constants from '../../../common/constants/'
import {
  MultiLineTextCheckBox
} from '../../../common/styles/common/CheckboxStyles'
import { vs, fontSize } from '../../../common/util'
const TermsAndConditionsScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  instructionsContainer: {
    height: vs(100),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructionsText: {
    fontSize: fontSize(14),
    textAlign: 'center'
  },
  instructionsSubShim: {
    height: 20
  },
  agreeText: {
    fontSize: fontSize(11),
    textAlign: 'center'
  },
  midSection: {
    height: vs(250)
  },
  buttonContainer: {
    height: vs(100),
    alignItems: 'center'
  },
  checkboxContainer: {
    width: '80%',
    marginBottom: 20
  },
  checkboxes: MultiLineTextCheckBox,
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  termsButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: { ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: Constants.DEFAULT_FONT_TEXT_SIZE },
    downTextStyle: {...Styles.TextOnlyButtonDownStyle,
      fontSize: Constants.DEFAULT_FONT_TEXT_SIZE },
    downStyle: Styles.TextOnlyButtonTextDownStyle
  },
  inputBox: {
    ...Styles.FormFieldStyle
  },
  inputShim: { ...Styles.Shim, height: 10 }
}

export { TermsAndConditionsScreenStyle }
