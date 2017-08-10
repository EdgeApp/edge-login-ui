import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'

const PinLoginScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {...Styles.BackgroundScreenImageStyle, alignItems: 'center'},
  featureBox: {
    position: 'relative',
    top: 55,
    width: 260,
    height: 376,
    backgroundColor: Colors.OVERLAY_BOX,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10%'
  },
  featureBoxIconHeader: {
    flex: 1,
    width: '100%',
    position: 'relative',
    backgroundColor: Colors.ACCENT_GREEN
  },
  featureBoxBody: {
    flex: 3,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputBoxes: {
    container: Styles.InputStyles.container,
    inputStyle: {...Styles.InputStyles.inputStyle, width: '100%'}
  },
  forgotButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: Styles.TextOnlyButtonTextUpStyle,
    downTextStyle: Styles.TextOnlyButtonTextDownStyle,
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  loginButton: {
    upStyle: {...Styles.PrimaryButtonUpStyle, width: '100%'},
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

export {PinLoginScreenStyle}
