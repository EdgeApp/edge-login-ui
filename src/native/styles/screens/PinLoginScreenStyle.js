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
      color: Constants.ACCENT_RED,
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

  forgotButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {...Styles.TextOnlyButtonTextUpStyle, color: Constants.WHITE},
    downTextStyle: {...Styles.TextOnlyButtonTextDownStyle, color: Constants.WHITE},
    downStyle: Styles.TextOnlyButtonDownStyle
  }
}

export { PinLoginScreenStyle }
