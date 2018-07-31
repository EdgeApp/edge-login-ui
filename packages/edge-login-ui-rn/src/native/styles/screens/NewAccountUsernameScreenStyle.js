// @flow

import * as Constants from '../../../common/constants'
import * as Styles from '../'
import { scale } from '../../../common/util/scaling.js'

const NewAccountUsernameScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  },
  instructions: {
    height: scale(Constants.USERNAME_INSTRUCTIONS_HEIGHT),
    width: '90%'
  },
  shim: {
    height: scale(30)
  },
  instructionsText: {
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: scale(20),
    paddingBottom: scale(20)
  },
  inputBox: Styles.MaterialInputOnWhite
}

export { NewAccountUsernameScreenStyle }
