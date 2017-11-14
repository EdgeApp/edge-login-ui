import * as Styles from '../'
import * as Constants from '../../../common/constants/'
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
    top: 40,
    width: '100%',
    height: vs(376),
    alignItems: 'center'
  },
  featureBoxBody: {
    height: vs(250),
    width: '100%'
  },
  logoHeader: Styles.LogoHeaderStyleShort,
  thumbprintButton: {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-end'

    },
    image: {
      position: 'relative',
      marginRight: '5%'
    }
  },
  listView: {
    height: vs(250),
    width: hs(160)
  },
  listItem: {
    container: {
      height: vs(40),
      width: '100%',
      backgroundColor: Constants.PRIMARY,
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      paddingLeft: 20,
      color: Constants.WHITE,
      backgroundColor: Constants.TRANSPARENT
    }
  },
  dropInput: {
    container: {
      width: 200,
      height: 30,
      // backgroundColor: Constants.WHITE,
      marginBottom: 20
    }
  },
  fourPin: Styles.FourDotInputStyle,
  usernameButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {...Styles.TextOnlyButtonTextUpStyle, color: Constants.WHITE, fontSize: 24},
    downTextStyle: {...Styles.TextOnlyButtonTextDownStyle, color: Constants.WHITE, fontSize: 24},
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  exitButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {...Styles.TextOnlyButtonTextUpStyle, color: Constants.WHITE, fontSize: 16},
    downTextStyle: {...Styles.TextOnlyButtonTextDownStyle, color: Constants.WHITE, fontSize: 16},
    downStyle: Styles.TextOnlyButtonDownStyle
  }
}

export { PinLoginScreenStyle }
