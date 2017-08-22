import * as Styles from '../'
import { vs, fontSize } from '../../../common/util'
const NewAccountUsernameScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  instructions: {
    height: vs(100),
    width: '80%'
  },
  instructionsText: {
    fontSize: fontSize(12),
    textAlign: 'center',
    paddingTop: vs(20)
  },
  inputBox: { ...Styles.FormFieldStyle }
}

export { NewAccountUsernameScreenStyle }
