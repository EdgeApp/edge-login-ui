import * as Styles from '../'
// import * as Colors from '../../../common/constants/Colors'
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
  agreeText: {
    fontSize: fontSize(11),
    textAlign: 'center',
    paddingBottom: 20
  },
  midSection: {
    height: vs(250)
  },
  buttonContainer: {
    height: vs(100),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  checkboxContainer: {
    width: '80%',
    flex: 1
  },
  checkboxes: MultiLineTextCheckBox,
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  inputBox: {
    ...Styles.FormFieldStyle
  },
  inputShim: { ...Styles.Shim, height: 10 }
}

export { TermsAndConditionsScreenStyle }
