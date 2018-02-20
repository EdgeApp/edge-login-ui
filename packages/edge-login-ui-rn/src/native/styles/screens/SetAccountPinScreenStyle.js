import * as Styles from '../'
import * as Constants from '../../../common/constants/'

const SetAccountPinScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: {
    ...Styles.HeaderContainerStyle,
    backgroundColor: Constants.PRIMARY
  },
  pageContainer: Styles.PageContainerWithHeaderStyle,
  row1: {
    ...Styles.ScreenRow,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  row2: { ...Styles.ScreenRow, flex: 1, alignItems: 'center' },
  row3: { ...Styles.ScreenRow, flex: 3, alignItems: 'center' },
  instructions: {
    position: 'relative',
    width: '80%',
    fontSize: Constants.FONTS.defaultFontSize,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_2,
    textAlign: 'center'
  },
  fourPin: Styles.FourDotInputDarkStyle,
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: 15,
    textAlign: 'center'
  },
  modal: Styles.SkipModalStyle,
  shim: {
    height: 5
  }
}

export { SetAccountPinScreenStyle }
