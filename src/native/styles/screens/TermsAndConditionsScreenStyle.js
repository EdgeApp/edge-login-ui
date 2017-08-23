import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'

const TermsAndConditionsScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center',
    backgroundColor: Colors.ACCENT_GREEN
  },
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
