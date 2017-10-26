import * as Styles from '../'
import * as Constants from '../../../common/constants/'
import { hs, vs } from '../../../common/util/PixelUtil'

const LoginPasswordScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  featureBox: {
    position: 'relative',
    top: vs(55),
    width: hs(260),
    height: vs(376),
    backgroundColor: Constants.TRANSPARENT
  },
  keyboardAvoidContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  innerView: {
    ...Styles.InnerView,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logoHeader: Styles.LogoHeaderStyle,
  featureBoxBody: {
    height: vs(250),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column-reverse'
  },
  inputsBox: {
    flex: 1,
    width: '100%'
  },
  buttonsBox: {
    flex: 3,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: Styles.FormFieldStyle,
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
