import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import { vs } from '../../../common/util'
const NewAccountUsernameScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: { ...Styles.HeaderContainerStyle, backgroundColor: Colors.PRIMARY },
  pageContainer: {...Styles.PageContainerWithHeaderStyle, alignItems: 'center'},
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  instructions: {
    height: vs(40)
  },
  inputBox: {...Styles.FormFieldStyle}
}

export { NewAccountUsernameScreenStyle }
