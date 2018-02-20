import * as Styles from '../'
// import * as Colors from '../../../common/constants/Colors'

const NewAccountPasswordScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  mainScrollView: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  scrollViewContentContainer: {
    alignItems: 'center'
  },
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center',
    flex: 1
  },
  innerView: { ...Styles.InnerView, alignItems: 'center' },
  status: Styles.PasswordStatusStyle,
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  inputBox: {
    ...Styles.MaterialInputOnWhite
  },

  inputShim: { ...Styles.Shim, height: 30 },
  modal: Styles.SkipModalStyle
}

export { NewAccountPasswordScreenStyle }
