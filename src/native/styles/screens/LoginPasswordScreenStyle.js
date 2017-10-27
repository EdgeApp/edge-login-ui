import * as Styles from '../'
import * as Constants from '../../../common/constants/'
import { vs } from '../../../common/util/PixelUtil'

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
    top: vs(55),
    width: '100%',
    height: vs(376),
    alignItems: 'center'
  },
  innerView: {
    ...Styles.InnerView,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logoHeader: Styles.LogoHeaderStyle,
  shimTiny: {...Styles.Shim, height: 10},
  shimSmall: {...Styles.Shim, height: 25},
  shim: Styles.Shim,
  buttonsBox: {
    width: '100%',
    alignItems: 'center'
  },
  input2: Styles.MaterialInput,
  inputWithDrop: Styles.FormFieldWithDropStyle,
  forgotButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {...Styles.TextOnlyButtonTextUpStyle, fontSize: 14, color: Constants.WHITE},
    downTextStyle: {...Styles.TextOnlyButtonTextDownStyle, fontSize: 14, color: Constants.WHITE},
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
    upTextStyle: {...Styles.TextOnlyButtonTextUpStyle, fontSize: 14, color: Constants.WHITE},
    downTextStyle: {...Styles.TextOnlyButtonTextDownStyle, fontSize: 14, color: Constants.WHITE},
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  modal: Styles.SkipModalStyle
}

export { LoginPasswordScreenStyle }
