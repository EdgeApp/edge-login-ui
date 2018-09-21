// @flow

import * as Constants from '../../../common/constants/'
import { vs } from '../../../common/util'
import { scale } from '../../../common/util/scaling'
import * as Styles from '../'

const LandingScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  inner: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  featureBox: {
    position: 'relative',
    top: vs(71),
    width: '100%',
    height: vs(306)
  },
  logoHeader: Styles.LogoHeaderScaledStyle,
  featureBoxContent: {
    // height: vs(186), 306- 125 - remaining space.
    width: '100%',
    flexDirection: 'column',
    height: vs(186),
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  featureBoxDescription: {
    // height: vs(186), 306- 125 - remaining space.
    width: '100%',
    justifyContent: 'flex-end'
  },
  featureBoxButtons: {
    // height: vs(186),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shim: {
    height: scale(20)
  },
  tagText: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    color: Constants.WHITE,
    backgroundColor: Constants.TRANSPARENT,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    textAlign: 'center',
    fontSize: scale(12)
  },
  createButton: {
    upStyle: Styles.TertiaryButtonUpStyle,
    upTextStyle: Styles.TertiaryButtonTextUpStyle,
    downTextStyle: Styles.TertiaryButtonTextDownStyle,
    downStyle: Styles.TertiaryButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: scale(12),
      color: Constants.WHITE
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: scale(12),
      color: Constants.WHITE
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  }
}

export { LandingScreenStyle }
