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
  featureBoxBody: {
    height: vs(250),
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logoHeader: Styles.LogoHeaderStyle,
  dropInput: {
    container: {
      width: 200,
      height: 30,
      backgroundColor: Colors.ACCENT_GREEN,
      marginBottom: 20
    }
  },
  fourPin: {
    container: {
      width: 200,
      height: 60
    },
    interactiveContainer: {
      flex: 1,
      width: '100%'
    },
    errorContainer: {
      flex: 1,
      width: '100%'
    },
    dotContainer: {
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    errorText: {
      width: '100%',
      textAlign: 'center',
      color: Colors.ACCENT_RED
    },
    input: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.8
    },
    circle: {
      borderWidth: 2,
      borderColor: Colors.PRIMARY,
      borderRadius: 15,
      height: 30,
      width: 30
    },
    circleSected: {
      backgroundColor: Colors.PRIMARY,
      borderWidth: 2,
      borderColor: Colors.PRIMARY,
      borderRadius: 15,
      height: 30,
      width: 30
    }
  },
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
