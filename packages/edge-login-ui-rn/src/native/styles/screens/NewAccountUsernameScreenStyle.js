// @flow

import * as Constants from '../../../common/constants'
import * as Styles from '../'

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
    fontSize: Styles.CreateAccountFont.defaultFontSize,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  inputBox: Styles.MaterialInputOnWhite
}

export { NewAccountUsernameScreenStyle }
