import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import { hs, vs } from '../../../common/util'

const PinLoginScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  featureBox: {
    position: 'relative',
    top: vs(55),
    width: hs(260),
    height: vs(376),
    backgroundColor: Colors.OVERLAY_BOX,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  featureBoxIconHeader: {
    flex: 3,
    width: '100%',
    position: 'relative',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  featureBoxBody: {
    flex: 4,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  logo: Styles.LogoImageStyles,
  inputBoxes: {
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

export { PinLoginScreenStyle }
