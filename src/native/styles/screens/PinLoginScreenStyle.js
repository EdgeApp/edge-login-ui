import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import { hs, vs } from '../../../common/util'

const PinLoginScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  innerView: {
    ...Styles.InnerView,
    justifyContent: 'flex-start',
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
  featureBoxBody: {
    height: vs(250),
    width: '100%'
  },
  logoHeader: Styles.LogoHeaderStyle,
  listView: {
    height: vs(250),
    width: hs(160)
  },
  listItem: {
    container: {
      height: vs(40),
      width: '100%',
      backgroundColor: Colors.WHITE,
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      paddingLeft: 20,
      color: Colors.PRIMARY
    }
  },
  dropInput: {
    container: {
      width: 200,
      height: 30,
      backgroundColor: Colors.ACCENT_GREEN,
      marginBottom: 20
    }
  },
  fourPin: Styles.FourDotInputStyle,
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
