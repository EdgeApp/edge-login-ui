import * as Styles from '../'
import * as Constants from '../../../common/constants'
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
    height: Constants.USERNAME_INSTRUCTIONS_HEIGHT,
    width: '90%'
  },
  shim: {
    height: 30
  },
  instructionsText: {
    fontSize: Constants.FONTS.defaultFontSize,
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  inputBox: Styles.MaterialInputOnWhite
}

export { NewAccountUsernameScreenStyle }
