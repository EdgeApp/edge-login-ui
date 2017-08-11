import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'

const LoginPasswordScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  featureBox: {
    position: 'relative',
    top: 55,
    width: 260,
    height: 376,
    backgroundColor: Colors.OVERLAY_BOX
  },
  featureBoxIconHeader: {
    flex: 3,
    width: '100%',
    position: 'relative',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  logo: Styles.LogoImageStyles,
  featureBoxBody: {
    flex: 7,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '10%'
  },
  inputsBox: {
    flex: 1,
    width: '100%'
  },
  buttonsBox: {
    flex: 3,
    width: '100%',
    justifyContent: 'space-around'
  },
  input: {
    container: Styles.InputStyles.container,
    inputStyle: { ...Styles.InputStyles.inputStyle, width: '100%' }
  },
  forgotButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: Styles.TextOnlyButtonTextUpStyle,
    downTextStyle: Styles.TextOnlyButtonTextDownStyle,
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  loginButton: {
    upStyle: { ...Styles.PrimaryButtonUpStyle, width: '100%' },
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  signupButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: Styles.TextOnlyButtonTextUpStyle,
    downTextStyle: Styles.TextOnlyButtonTextDownStyle,
    downStyle: Styles.TextOnlyButtonDownStyle
  }
}

export { LoginPasswordScreenStyle }
