import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
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
    backgroundColor: Colors.OVERLAY_BOX
  },
  logoHeader: Styles.LogoHeaderStyle,
  featureBoxBody: {
    height: vs(250),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
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
  forgotButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: Styles.TextOnlyButtonTextUpStyle,
    downTextStyle: Styles.TextOnlyButtonTextDownStyle,
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
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
