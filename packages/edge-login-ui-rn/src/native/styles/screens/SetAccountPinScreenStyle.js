// @flow

import * as Constants from '../../../common/constants/'
import { scale } from '../../../common/util/scaling.js'
import * as Styles from '../'

const SetAccountPinScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: {
    ...Styles.HeaderContainerScaledStyle,
    backgroundColor: Constants.PRIMARY
  },
  pageContainer: Styles.PageContainerWithHeaderStyle,
  row1: {
    ...Styles.ScreenRow,
    flex: -1,
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  row2: {
    ...Styles.ScreenRow,
    paddingVertical: 12,
    flex: -1,
    alignItems: 'center'
  },
  row3: {
    ...Styles.ScreenRow,
    paddingVertical: 12,
    flex: -1,
    alignItems: 'center'
  },
  instructions: {
    position: 'relative',
    width: '80%',
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_2,
    textAlign: 'center'
  },
  fourPin: {
    ...Styles.FourDotInputDarkScaledStyle,
    container: {
      ...Styles.FourDotInputDarkScaledStyle.container,
      height: scale(120)
    }
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: scale(15),
    textAlign: 'center'
  },
  modal: Styles.SkipModalStyle,
  shim: {
    height: scale(5)
  }
}

export { SetAccountPinScreenStyle }
