// @flow
import * as Styles from '../'
import * as Constants from '../../../common/constants/'

const LoginPasswordScreenStyle = {
  container: Styles.ScreenStyle,
  mainScrollView: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  featureBox: {
    position: 'relative',
    top: 55,
    width: '100%',
    alignItems: 'center'
  },
  innerView: {
    ...Styles.InnerView,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logoHeader: {
    ...Styles.LogoHeaderStyle,
    container: { ...Styles.LogoHeaderStyle.container, height: 90 }
  },
  shimTiny: { ...Styles.Shim, height: 10 },
  shimSmall: { ...Styles.Shim, height: 25 },
  shim: Styles.Shim,
  buttonsBox: {
    width: '100%',
    alignItems: 'center'
  },
  modalMiddle: {
    width: '100%',
    height: 100
  },
  input2: Styles.MaterialInput,
  inputModal: {
    ...Styles.MaterialInputOnWhite,
    container: { ...Styles.MaterialInputOnWhite.container, width: '100%' }
  },
  inputWithDrop: Styles.MaterialInputWithDrop,
  forgotButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: 14,
      color: Constants.WHITE
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: 14,
      color: Constants.WHITE
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.TertiaryButtonUpStyle,
    upTextStyle: Styles.TertiaryButtonTextUpStyle,
    downTextStyle: Styles.TertiaryButtonTextDownStyle,
    downStyle: Styles.TertiaryButtonDownStyle
  },
  signupButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: 14,
      color: Constants.WHITE
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: 14,
      color: Constants.WHITE
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: 15,
    textAlign: 'center'
  },
  modal: Styles.SkipModalStyle
}

export { LoginPasswordScreenStyle }
