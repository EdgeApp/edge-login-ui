// @flow

import * as Constants from '../../../common/constants/'
import { hs, vs } from '../../../common/util'
import { scale } from '../../../common/util/scaling.js'
import * as Styles from '../'

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
    top: scale(40),
    width: '100%',
    height: vs(376),
    alignItems: 'center'
  },
  featureBoxBody: {
    height: vs(240),
    width: '100%'
  },
  logoHeader: Styles.LogoHeaderScaledStyle,
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
    textComtainer: {
      flex: 25,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    iconButton: {
      container: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%'
      },
      icon: {
        color: Constants.WHITE
      },
      iconPressed: {
        color: Constants.WHITE
      },
      iconSize: scale(Constants.FONTS.defaultFontSize),
      underlayColor: Constants.TRANSPARENT
    },
    text: {
      paddingLeft: 20,
      color: Constants.WHITE,
      backgroundColor: Constants.TRANSPARENT,
      fontFamily: Constants.FONTS.fontFamilyRegular,
      fontSize: scale(Constants.FONTS.defaultFontSize)
    }
  },
  dropInput: {
    container: {
      width: 200,
      height: scale(30),
      // backgroundColor: Constants.WHITE,
      marginBottom: 20
    }
  },
  fourPin: Styles.FourDotInputStyle,
  usernameButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      color: Constants.WHITE,
      fontSize: scale(24)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      color: Constants.WHITE,
      fontSize: scale(24)
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  exitButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      color: Constants.WHITE,
      fontSize: scale(16)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      color: Constants.WHITE,
      fontSize: scale(16)
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  modal: Styles.SkipModalStyle
}

export { PinLoginScreenStyle }
