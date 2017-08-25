import * as Styles from '../'
// import * as Colors from '../../../common/constants/Colors'

const NewAccountPasswordScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  innerView: {...Styles.InnerView, alignItems: 'center'},
  status: Styles.PasswordStatusStyle,
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  inputBox: {
    ...Styles.FormFieldStyle
  },
  inputShim: {...Styles.Shim, height: 10},
  modal: Styles.SkipModalStyle
}

export { NewAccountPasswordScreenStyle }
