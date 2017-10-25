import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import { fontSize } from '../../../common/util'

const SetAccountPinScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: { ...Styles.HeaderContainerStyle, backgroundColor: Colors.PRIMARY },
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
    fontSize: fontSize(14),
    textAlign: 'center'
  },
  fourPin: Styles.FourDotInputStyle,
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  modal: Styles.SkipModalStyle
}

export { SetAccountPinScreenStyle }
