// @flow

import { scale } from '../../../common/util/scaling.js'
import * as Constants from '../../constants/'
import * as Styles from '../'

const HeaderContainerStyle = {
  container: {
    position: 'relative',
    height: Constants.HEADER_HEIGHT,
    width: '100%',
    backgroundColor: Constants.TRANSPARENT,
    flexDirection: 'row',
    paddingVertical: scale(6)
  },
  headerBackButtonStyle: {
    backButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    backIconStyle: {
      position: 'relative',
      top: scale(1),
      paddingLeft: scale(10),
      paddingRight: scale(6),
      color: Constants.WHITE
    },
    sideText: {
      color: Constants.WHITE,
      fontSize: scale(14)
    },
    icon: {
      color: Constants.WHITE,
      fontSize: scale(25)
    },
    default: {
      backgroundColor: Constants.TRANSPARENT,
      color: Constants.WHITE
    }
  },
  left: {
    flex: 1,
    justifyContent: 'center'
  },
  center: {
    flex: 3,
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    justifyContent: 'center'
  },
  headlineText: {
    fontSize: scale(17),
    width: '100%',
    textAlign: 'center',
    color: Constants.WHITE
  },
  subHeadText: {
    fontSize: scale(11),
    width: '100%',
    textAlign: 'center',
    color: Constants.ACCENT_MINT
  },
  textButton: {
    upStyle: { ...Styles.TextOnlyButtonUpStyle, width: '100%' },
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      width: '100%',
      color: Constants.WHITE,
      fontSize: Constants.FONTS.defaultButtonTextSize
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      width: '100%',
      color: Constants.SECONDARY,
      fontSize: Constants.FONTS.defaultButtonTextSize
    },
    downStyle: {
      ...Styles.TextOnlyButtonDownStyle,
      width: '100%',
      height: scale(50)
    }
  }
}

const HeaderContainerScaledStyle = {
  container: {
    position: 'relative',
    height: scale(Constants.HEADER_HEIGHT),
    width: '100%',
    backgroundColor: Constants.TRANSPARENT,
    flexDirection: 'row',
    paddingTop: scale(6)
  },
  headerBackButtonStyle: {
    backButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    backIconStyle: {
      position: 'relative',
      top: scale(1),
      paddingLeft: scale(10),
      paddingRight: scale(6),
      color: Constants.WHITE,
      fontSize: scale(20)
    },
    sideText: {
      color: Constants.WHITE,
      fontSize: scale(14)
    },
    icon: {
      color: Constants.WHITE
    },
    default: {
      backgroundColor: Constants.TRANSPARENT,
      color: Constants.WHITE
    }
  },
  left: {
    flex: 1,
    justifyContent: 'center'
  },
  center: {
    flex: 3,
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    justifyContent: 'center'
  },
  headlineText: {
    fontSize: scale(17),
    width: '100%',
    textAlign: 'center',
    color: Constants.WHITE
  },
  subHeadText: {
    fontSize: scale(11),
    width: '100%',
    textAlign: 'center',
    color: Constants.ACCENT_MINT
  },
  textButton: {
    upStyle: { ...Styles.TextOnlyButtonUpScaledStyle, width: '100%' },
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpScaledStyle,
      width: '100%',
      color: Constants.WHITE,
      fontSize: scale(Constants.FONTS.defaultButtonTextSize)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownScaledStyle,
      width: '100%',
      color: Constants.SECONDARY,
      fontSize: scale(Constants.FONTS.defaultButtonTextSize)
    },
    downStyle: {
      ...Styles.TextOnlyButtonDownScaledStyle,
      width: '100%',
      height: scale(50)
    }
  }
}

export { HeaderContainerStyle }
export { HeaderContainerScaledStyle }
